import { useState, useEffect } from 'react';
import { IconButton, Skeleton, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

import MoreOptionButton from 'src/components/admin_portal/MoreOptionButton';
import Card from 'src/components/admin_portal/Card';
import PopupForm from 'src/components/admin_portal/PopupForm';
import WorkForm from 'src/components/admin_portal/_form/WorkForm';
import EducationForm from 'src/components/admin_portal/_form/EducationForm';
import { IWork } from 'src/services/api/workService';
import { IEducation } from 'src/services/api/educationService';
import { readableDate } from 'src/utils/common';
import useWorkStore, { workActions } from 'src/store/workStore';
import useEducationStore, { educationActions } from 'src/store/educationStore';

import Table, { Column, Row } from 'src/components/admin_portal/_form_element/Table';

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
    const {
        list: works,
        action: workFormAction
    } = useWorkStore();

    const {
        list: educations,
        action: educationFormAction
    } = useEducationStore();

    const [workFormOpen, setWorkFormOpen] = useState(false);
    const [educationFormOpen, setEducationFormOpen] = useState(false);

    const handleEditWorkPopup = async (id: number | null) => {
        workActions.setFormState({ id, action: 'UPDATE' });
        setWorkFormOpen(true);
    }

    const handleCreateWorkPopup = async () => {
        workActions.setFormState({ id: null, action: 'CREATE' });
        setWorkFormOpen(true);
    }

    const handleEditEducationPopup = async (id: number | null) => {
        educationActions.setFormState({ id, action: 'UPDATE' });
        setEducationFormOpen(true);
    }

    const handleCreateEducationPopup = async () => {
        educationActions.setFormState({ id: null, action: 'CREATE' });
        setEducationFormOpen(true);
    }

    useEffect(() => {
        workActions.fetchAllWorks();
        educationActions.fetchAllEducations();
    }, []);

    const workColumns: Column[] = [
        { id: 'companyName', label: 'Company name' },
        { id: 'title', label: 'Title' },
        { id: 'date', label: 'Date' },
        { id: 'createdAt', label: 'Created at' },
        { id: 'action', label: 'Action' },
    ];

    const workData: Row[] = works ? works.map((work) => ({
        companyName: work.companyName ?? '',
        title: work.title ?? '',
        date: readableDate(work.startMonth!, work.startYear!, work.endMonth!, work.endYear!, work.isCurrent === 1) ?? '',
        createdAt: work.createdAt!.toString() ?? '',
        action: work.id ?? 0
    })
    ) : [];

    const educationColumns: Column[] = [
        { id: 'schoolName', label: 'School name' },
        { id: 'degree', label: 'Degree' },
        { id: 'subject', label: 'Subject' },
        { id: 'date', label: 'Date' },
        { id: 'action', label: 'Action' },
    ];

    const educationData: Row[] = educations ? educations.map((education) => ({
        schoolName: education.schoolName ?? '',
        degree: education.degree ?? '',
        subject: education.subject ?? '',
        date: readableDate(education.startMonth, education.startYear, education.endMonth, education.endYear, education.isCurrent === 1) ?? '',
        action: education.id ?? 0
    })
    ) : [];

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Table
                    title='Work'
                    isLoading={useWorkStore.getState().isLoadingWorks}
                    columns={workColumns}
                    data={workData}
                    handleOnClickEdit={handleEditWorkPopup}
                    handleOnClickCreate={handleCreateWorkPopup}
                />
                <Table
                    title='Education'
                    isLoading={useEducationStore.getState().isLoadingEducations}
                    columns={educationColumns}
                    data={educationData}
                    handleOnClickEdit={handleEditEducationPopup}
                    handleOnClickCreate={handleCreateEducationPopup}
                />
            </Box>
            <WorkForm
                action={workFormAction ?? 'CREATE'}
                setOpen={setWorkFormOpen}
                open={workFormOpen}
            />
            <EducationForm
                action={educationFormAction ?? 'CREATE'}
                setOpen={setEducationFormOpen}
                open={educationFormOpen}
            />
        </>
    );
}

export default Profile;