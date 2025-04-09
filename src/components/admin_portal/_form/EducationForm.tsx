import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';
import { z } from 'zod';

import { getMonthOptions, getYearOptions, convertZodErrorToLocalError } from 'src/utils/common';
import EducationService, { IEducation } from 'src/services/api/educationService';
import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import Checkbox from '../_form_element/Checkbox';
import DropdownList from '../_form_element/DropdownList';
import useEducationStore, { educationActions } from 'src/store/educationStore';
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
    const {
        current: education,
        id: educationFormId,
        isLoadingEducation,
        isUpdatingEducation,
        isCreatingEducation
    } = useEducationStore();
    const [educationError, setEducationError] = useState<EducationError>({});

    const handleOnClickCreate = async () => {
        try {
            EducationSchema.parse(education);
            if (!education?.schoolName || !education?.degree || !education?.subject ||
                !education?.description || !education?.startMonth || !education?.startYear ||
                !education?.endMonth || !education?.endYear) {
                return;
            }
            const educationData: IEducation = {
                id: 0, // Temporary ID for creation
                schoolName: education.schoolName,
                degree: education.degree,
                subject: education.subject,
                description: education.description,
                startMonth: education.startMonth,
                startYear: education.startYear,
                endMonth: education.endMonth,
                endYear: education.endYear,
                isCurrent: education.isCurrent ? 1 : 0
            };
            await educationActions.createEducation(educationData);
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
            EducationSchema.parse(education);
            if (!education?.id || !education?.schoolName || !education?.degree ||
                !education?.subject || !education?.description || !education?.startMonth ||
                !education?.startYear || !education?.endMonth || !education?.endYear) {
                return;
            }
            const educationData: IEducation = {
                id: education.id,
                schoolName: education.schoolName,
                degree: education.degree,
                subject: education.subject,
                description: education.description,
                startMonth: education.startMonth,
                startYear: education.startYear,
                endMonth: education.endMonth,
                endYear: education.endYear,
                isCurrent: education.isCurrent ? 1 : 0
            };
            await educationActions.updateEducation(educationData);
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
        educationActions.clearCurrentEducation();
        setEducationError({});
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.action === 'UPDATE' && props.open) {
            educationActions.fetchEducationById(educationFormId!);
        }
    }, [props.open]);

    const loadingCompo = (
        <Backdrop open={isLoadingEducation || isUpdatingEducation}>
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
                    value={education?.schoolName ?? ''}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, schoolName: e.target.value })}
                    errorMsg={educationError.schoolName}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <InputText
                    label={"Degree*"}
                    value={education?.degree ?? ''}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, degree: e.target.value })}
                    errorMsg={educationError.degree}
                />
                <InputText
                    label={"Subject*"}
                    value={education?.subject ?? ''}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, subject: e.target.value })}
                    errorMsg={educationError.subject}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Textarea
                    label={"Description"}
                    value={education?.description ?? ''}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, description: e.target.value })}
                    errorMsg={educationError.description}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Checkbox
                    label={"Is current education*"}
                    isChecked={education?.isCurrent === 1}
                    onChange={(e) => educationActions.setCurrentEducation({
                        ...education,
                        isCurrent: e.target.checked ? 1 : 0,
                        endMonth: e.target.checked ? undefined : education?.endMonth,
                        endYear: e.target.checked ? undefined : education?.endYear,
                    })}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <DropdownList
                    label={"Start date*"}
                    value={education?.startMonth?.toString()!}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, startMonth: Number(e.target.value) })}
                    options={getMonthOptions()}
                    errorMsg={educationError.startMonth}
                />
                <DropdownList
                    label={""}
                    value={education?.startYear?.toString()!}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, startYear: Number(e.target.value) })}
                    options={getYearOptions()}
                    errorMsg={educationError.startYear}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <DropdownList
                    label={"End date*"}
                    value={education?.endMonth?.toString()!}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, endMonth: Number(e.target.value) })}
                    options={getMonthOptions()}
                    isDisabled={education?.isCurrent === 1}
                    errorMsg={educationError.endMonth}
                />
                <DropdownList
                    label={""}
                    value={education?.endYear?.toString()!}
                    onChange={(e) => educationActions.setCurrentEducation({ ...education, endYear: Number(e.target.value) })}
                    options={getYearOptions()}
                    isDisabled={education?.isCurrent === 1}
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
        {isUpdatingEducation ? loadingCompo : <></>}
    </>)

    return (
        <>
            <PopupForm
                open={props.open}
                onClose={handleOnClickClose}
                setOpen={props.setOpen}
                title={props.action == "CREATE" ? "Create education" : "Edit education"}
                form={<>{isLoadingEducation ? (loadingCompo) : (formCompo)}</>}
            />
        </>
    );
};

export default EducationForm; 