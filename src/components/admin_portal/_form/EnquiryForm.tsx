import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';
import { observer } from 'mobx-react-lite';

import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import PopupForm from '../PopupForm';
import enquiryStore from 'src/store/enquiryStore';
import useStyles from 'src/style';
import useUiStore from 'src/store/uiStore';

interface EnquiryFormProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    action: 'CREATE' | 'UPDATE';
}

const EnquiryForm: React.FC<EnquiryFormProps> = (props) => {
    const classes = useStyles();
    const { showSnackbar } = useUiStore();

    const handleOnClickClose = async () => {
        enquiryStore.setCurrentEnquiry(null);
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.open && props.action === 'UPDATE') {
            enquiryStore.fetchEnquiryById(enquiryStore.currentEnquiry?.id!);
        }
    }, [props.open, props.action]);

    const loadingCompo = (
        <Backdrop open={enquiryStore.loading}>
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
                    label={"Name"}
                    value={enquiryStore.currentEnquiry?.name ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
                <InputText
                    label={"Email"}
                    value={enquiryStore.currentEnquiry?.email ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <InputText
                    label={"Company name"}
                    value={enquiryStore.currentEnquiry?.companyName ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
                <InputText
                    label={"Phone no."}
                    value={enquiryStore.currentEnquiry?.phoneNo ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Textarea
                    label={"Comment"}
                    value={enquiryStore.currentEnquiry?.comment ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
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
        </Box>
    </>)

    return (
        <>
            <PopupForm
                open={props.open}
                onClose={handleOnClickClose}
                setOpen={props.setOpen}
                title="View enquiry"
                form={<>{enquiryStore.loading ? (loadingCompo) : (formCompo)}</>}
            />
        </>
    );
};

export default observer(EnquiryForm); 