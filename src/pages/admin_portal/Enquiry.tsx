import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useEnquiryStore, { enquiryActions } from 'src/store/enquiryStore';
import Table, { Column, Row } from 'src/components/admin_portal/_form_element/Table';
import EnquiryForm from 'src/components/admin_portal/_form/EnquiryForm';

const Enquiry: React.FC = () => {
    const {
        list: enquiries,
        action: enquiryFormAction
    } = useEnquiryStore();

    const [enquiryFormOpen, setEnquiryFormOpen] = useState(false);

    useEffect(() => {
        enquiryActions.fetchAllEnquiries();
    }, []);

    const enquiryColumns: Column[] = [
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'companyName', label: 'Company' },
        { id: 'phoneNo', label: 'Phone' },
        { id: 'comment', label: 'Comment' },
        { id: 'action', label: 'Action' },
    ];

    const enquiryData: Row[] = enquiries ? enquiries.map((enquiry) => ({
        name: enquiry.name ?? '',
        email: enquiry.email ?? '',
        companyName: enquiry.companyName ?? '',
        phoneNo: enquiry.phoneNo ?? '',
        comment: enquiry.comment ?? '',
        action: enquiry.id ?? 0
    })) : [];

    const handleEditEnquiry = (id: number | null) => {
        enquiryActions.setFormState({ id, action: 'UPDATE' });
        setEnquiryFormOpen(true);
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Table
                    title='Enquiries'
                    isLoading={useEnquiryStore.getState().isLoadingEnquiries}
                    columns={enquiryColumns}
                    data={enquiryData}
                    handleOnClickEdit={handleEditEnquiry}
                    handleOnClickCreate={() => { }}
                />
            </Box>
            <EnquiryForm
                setOpen={setEnquiryFormOpen}
                open={enquiryFormOpen}
            />
        </>
    );
}

export default Enquiry; 