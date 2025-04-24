import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';
import { z } from 'zod';
import { observer } from 'mobx-react-lite';

import { getMonthOptions, getYearOptions, convertZodErrorToLocalError } from 'src/utils/common';
import EducationService, { IEducation } from 'src/services/api/educationService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';
import educationStore from 'src/store/educationStore';
import PopupForm from '../PopupForm';
import { EducationError } from 'src/services/api/educationService';
import { EducationSchema } from 'src/utils/validator';

import useStyles from 'src/style';
import useUiStore from 'src/store/uiStore';

interface EducationFormProps {
    action: "UPDATE" | "CREATE";
    setOpen: (open: boolean) => void;
    open: boolean;
}

const EducationForm: React.FC<EducationFormProps> = (props) => {
    const classes = useStyles();
    const { showSnackbar } = useUiStore();
    const [educationError, setEducationError] = useState<EducationError>({});

    const handleOnClickCreate = async () => {
        try {
            EducationSchema.parse(educationStore.currentEducation);
            const current = educationStore.currentEducation;
            if (!current?.schoolName || !current?.degree || !current?.subject ||
                !current?.description || !current?.startMonth || !current?.startYear ||
                !current?.endMonth || !current?.endYear) {
                return;
            }
            const educationData: Omit<IEducation, 'id' | 'createdAt'> = {
                schoolName: current.schoolName,
                degree: current.degree,
                subject: current.subject,
                description: current.description,
                startMonth: current.startMonth,
                startYear: current.startYear,
                endMonth: current.endMonth,
                endYear: current.endYear,
                isCurrent: Boolean(current.isCurrent)
            };
            await educationStore.createEducation(educationData);
            showSnackbar('success', 'Success create');
            setEducationError({});
        } catch (err) {
            if (err instanceof z.ZodError) {
                let validationError: EducationError = {};
                validationError = convertZodErrorToLocalError(err, validationError)
                setEducationError(validationError);
                return;
            }
            showSnackbar('error', 'Fail to create');
        }
    }

    const handleOnClickUpdate = async () => {
        try {
            EducationSchema.parse(educationStore.currentEducation);
            const current = educationStore.currentEducation;
            if (!current?.id || !current?.schoolName || !current?.degree ||
                !current?.subject || !current?.description || !current?.startMonth ||
                !current?.startYear || !current?.endMonth || !current?.endYear) {
                return;
            }
            const educationData: Partial<IEducation> = {
                schoolName: current.schoolName,
                degree: current.degree,
                subject: current.subject,
                description: current.description,
                startMonth: current.startMonth,
                startYear: current.startYear,
                endMonth: current.endMonth,
                endYear: current.endYear,
                isCurrent: Boolean(current.isCurrent)
            };
            await educationStore.updateEducation(current.id, educationData);
            showSnackbar('success', 'Success update');
            setEducationError({});
        } catch (err) {
            if (err instanceof z.ZodError) {
                let validationError: EducationError = {};
                validationError = convertZodErrorToLocalError(err, validationError)
                setEducationError(validationError);
                return;
            }
            showSnackbar('error', 'Fail to update');
        }
    }

    const handleOnClickClose = async () => {
        educationStore.setCurrentEducation(null);
        setEducationError({});
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.action === 'UPDATE' && props.open && educationStore.currentEducation?.id) {
            educationStore.fetchEducationById(educationStore.currentEducation.id);
        }
    }, [props.open]);

    const loadingCompo = (
        <Backdrop open={educationStore.loading}>
            <CircularProgress color="secondary" />
        </Backdrop>
    )

    const formCompo = (<>
        <Box
            component="form"
            sx={{
                display: 'flex', flexDirection: 'column', height: '85%', overflow: 'scroll',
            }}
            noValidate
            autoComplete="off"
        >
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <InputText
                    label={"School name*"}
                    value={educationStore.currentEducation?.schoolName ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            educationStore.setCurrentEducation({ ...current, schoolName: e.target.value });
                        }
                    }}
                    errorMsg={educationError.schoolName}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <InputText
                    label={"Degree*"}
                    value={educationStore.currentEducation?.degree ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            educationStore.setCurrentEducation({ ...current, degree: e.target.value });
                        }
                    }}
                    errorMsg={educationError.degree}
                />
                <InputText
                    label={"Subject*"}
                    value={educationStore.currentEducation?.subject ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            educationStore.setCurrentEducation({ ...current, subject: e.target.value });
                        }
                    }}
                    errorMsg={educationError.subject}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Textarea
                    label={"Description"}
                    value={educationStore.currentEducation?.description ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            educationStore.setCurrentEducation({ ...current, description: e.target.value });
                        }
                    }}
                    errorMsg={educationError.description}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Checkbox
                    label={"Is current education*"}
                    isChecked={Boolean(educationStore.currentEducation?.isCurrent)}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            educationStore.setCurrentEducation({
                                ...current,
                                isCurrent: e.target.checked,
                                endMonth: e.target.checked ? undefined : current.endMonth,
                                endYear: e.target.checked ? undefined : current.endYear,
                            });
                        }
                    }}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <DropdownList
                    label={"Start date*"}
                    value={educationStore.currentEducation?.startMonth?.toString() ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) {
                                educationStore.setCurrentEducation({ ...current, startMonth: value });
                            }
                        }
                    }}
                    options={getMonthOptions()}
                    errorMsg={educationError.startMonth}
                />
                <DropdownList
                    label={""}
                    value={educationStore.currentEducation?.startYear?.toString() ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) {
                                educationStore.setCurrentEducation({ ...current, startYear: value });
                            }
                        }
                    }}
                    options={getYearOptions()}
                    errorMsg={educationError.startYear}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <DropdownList
                    label={"End date*"}
                    value={educationStore.currentEducation?.endMonth?.toString() ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) {
                                educationStore.setCurrentEducation({ ...current, endMonth: value });
                            }
                        }
                    }}
                    options={getMonthOptions()}
                    isDisabled={Boolean(educationStore.currentEducation?.isCurrent)}
                    errorMsg={educationError.endMonth}
                />
                <DropdownList
                    label={""}
                    value={educationStore.currentEducation?.endYear?.toString() ?? ''}
                    onChange={(e) => {
                        const current = educationStore.currentEducation;
                        if (current) {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) {
                                educationStore.setCurrentEducation({ ...current, endYear: value });
                            }
                        }
                    }}
                    options={getYearOptions()}
                    isDisabled={Boolean(educationStore.currentEducation?.isCurrent)}
                    errorMsg={educationError.endYear}
                />
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '20px',
        }}>
            <Button
                onClick={() => handleOnClickClose()}
                sx={{ color: '#FFFFFF' }}
                variant='outlined'>
                Close
            </Button>
            <Button
                onClick={() => props.action == "CREATE" ? handleOnClickCreate() : handleOnClickUpdate()}
                variant="contained"
                color="secondary">
                {props.action == "CREATE" ? "Create" : "Update"}
            </Button>
        </Box>
        {educationStore.loading ? loadingCompo : <></>}
    </>)

    return (
        <>
            <PopupForm
                open={props.open}
                onClose={handleOnClickClose}
                setOpen={props.setOpen}
                title={props.action == "CREATE" ? "Create education" : "Edit education"}
                form={<>{educationStore.loading ? (loadingCompo) : (formCompo)}</>}
            />
        </>
    );
};

export default observer(EducationForm); 