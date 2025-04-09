import { useState, useEffect } from 'react';
import { Button, Backdrop, CircularProgress, Box } from '@mui/material';

import InputText from '../_form_element/InputText';
import Textarea from '../_form_element/Textarea';
import PopupForm from '../PopupForm';
import useEnquiryStore, { enquiryActions } from 'src/store/enquiryStore';
import useStyles from 'src/style';
import useUiStore from 'src/store/uiStore';

interface EnquiryFormProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}

const EnquiryForm: React.FC<EnquiryFormProps> = (props) => {
    const classes = useStyles();
    const { showSnackbar } = useUiStore();

    const {
        current: enquiry,
        isLoadingEnquiry,
        id: enquiryFormId
    } = useEnquiryStore();

    const handleOnClickClose = async () => {
        enquiryActions.clearCurrentEnquiry();
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.open) {
            enquiryActions.fetchEnquiryById(enquiryFormId!);
        }
    }, [props.open]);

    const loadingCompo = (
        <Backdrop open={isLoadingEnquiry}>
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
                    value={enquiry?.name ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
                <InputText
                    label={"Email"}
                    value={enquiry?.email ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <InputText
                    label={"Company name"}
                    value={enquiry?.companyName ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
                <InputText
                    label={"Phone no."}
                    value={enquiry?.phoneNo ?? ''}
                    isDisabled={true}
                    onChange={() => { }}
                />
            </Box>
            <Box className={classes.formRow} sx={{ gap: 2 }}>
                <Textarea
                    label={"Comment"}
                    value={enquiry?.comment ?? ''}
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
                form={<>{isLoadingEnquiry ? (loadingCompo) : (formCompo)}</>}
            />
        </>
    );
};

export default EnquiryForm; 