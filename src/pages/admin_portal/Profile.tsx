import { useState, useEffect } from 'react';
import { IconButton, Skeleton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

import MoreOptionButton from 'src/components/admin_portal/MoreOptionButton';
import Card from 'src/components/admin_portal/Card';
import PopupForm from 'src/components/admin_portal/PopupForm';
import WorkForm from 'src/components/admin_portal/_form/WorkForm';
import { IWork } from 'src/services/api/workService';
import { readableDate } from 'src/utils/common';
import useWorkStore from 'src/store/workStore';

import Table, { Column, Row } from 'src/components/admin_portal/_form_element/Table';

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {

    const { works, worksLoading, workFormId, fetchAllWorks, setWorkFormId, clearWork } = useWorkStore();

    const [action, setAction] = useState<"CREATE" | "UPDATE">("CREATE");

    const [workFormOpen, setWorkFormOpen] = useState(false);

    const handleEditPopup = async (id: number | null) => {
        setAction('UPDATE');
        setWorkFormId(id);
        setWorkFormOpen(true);
    }

    const handleCreatePopup = async () => {
        setAction('CREATE');
        setWorkFormOpen(true);
    }

    useEffect(() => {
        fetchAllWorks();
    }, []);

    const columns: Column[] = [
        { id: 'companyName', label: 'Company name' },
        { id: 'title', label: 'Title' },
        { id: 'date', label: 'Date' },
        { id: 'createdAt', label: 'Created at' },
        { id: 'action', label: 'Action' },
    ];

    const data: Row[] = works ? works.map((work) => ({
        companyName: work.companyName ?? '',
        title: work.title ?? '',
        date: readableDate(work.startMonth!, work.startYear!, work.endMonth!, work.endYear!, work.isCurrent === 1) ?? '',
        createdAt: work.createdAt!.toString() ?? '',
        action: work.id ?? 0
    })
    ) : [];

    return (
        <>
            <Table
                title='Work'
                isLoading={worksLoading}
                columns={columns}
                data={data}
                handleOnClickEdit={handleEditPopup}
                handleOnClickCreate={handleCreatePopup}
            />
            <WorkForm
                action={action}
                setOpen={setWorkFormOpen}
                open={workFormOpen}
            />

        </>
    );
}

export default Profile;