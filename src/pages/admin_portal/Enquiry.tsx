import { useEffect } from 'react';
import useEnquiryStore, { enquiryActions } from 'src/store/enquiryStore';

const Enquiry: React.FC = () => {
    // const {
    //     list: enquiries,
    //     action: enquiryFormAction
    // } = useEnquiryStore();

    useEffect(() => {
        enquiryActions.fetchAllEnquiries();
    }, []);

    return (
        <>
            {/* Content will be added in the next step */}
        </>
    );
}

export default Enquiry; 