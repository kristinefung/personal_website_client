import { useState, useEffect } from 'react';

import { IconButton, Button, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

import MoreOptionButton from 'src/components/admin_portal/MoreOptionButton';
import DashboardContainer from 'src/components/admin_portal/DashboardContainer/DashboardContainer';
import PopupForm from 'src/components/admin_portal/PopupForm/PopupForm';
import WorkForm from 'src/components/admin_portal/_form/WorkForm';
import WorkService, { type Work } from 'src/services/api/workService';
import { readableDate } from 'src/utils/common';

import './Profile.css';

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
    const [action, setAction] = useState<"CREATE" | "UPDATE">("CREATE");

    const [works, setWorks] = useState<Work[]>([]);
    const [isLoadingWorks, setIsLoadingWorks] = useState(true);
    const [worksError, setWorksError] = useState<string | null>(null);

    const [workFormOpen, setWorkFormOpen] = useState(false);
    const [popupWork, setPopupWork] = useState<Work>({});

    const workService = WorkService();

    const fetchWorks = async () => {
        setIsLoadingWorks(true);
        try {
            const works = await workService.getAllWorks();
            setWorks(works);
        } catch (err) {
            if (err instanceof Error) {
                setWorksError(err.message);
            } else {
                setWorksError("Unknown error");
            }
        } finally {
            setIsLoadingWorks(false);
        }
    };

    const handlePopup = async (w: Work, a: "CREATE" | "UPDATE") => {
        setAction(a);
        setPopupWork(w);
        setWorkFormOpen(true);
    }

    useEffect(() => {
        fetchWorks();
    }, []);

    const workTable = (
        <table className='dashboard-table'>
            <tbody>
                <tr>
                    <th>Company name</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Created at</th>
                    <th>Action</th>
                </tr>
                {works.map((work) => {
                    return (
                        <tr key={work.id}>
                            <td>
                                {work.companyName}
                            </td>
                            <td>
                                {work.title}
                            </td>
                            <td>
                                {readableDate(work.startMonth!, work.startYear!, work.endMonth!, work.endYear!, work.isCurrent === 1)}
                            </td>
                            <td>
                                {work.createdAt!.toString()}
                            </td>
                            <td>
                                <IconButton
                                    style={{ color: '#FFFFFF', padding: '5px' }}
                                    onClick={() => handlePopup(work, "UPDATE")}>
                                    <EditIcon />
                                </IconButton>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

    return (
        <>
            <DashboardContainer
                title='Work'
                buttonGroup={(
                    <>
                        <MoreOptionButton
                            options={[
                                { name: "Create", onClick: () => handlePopup({}, "CREATE") }
                            ]}
                        />
                    </>
                )}
                body={workTable}
                flex={1}
            />
            <PopupForm
                open={workFormOpen}
                setOpen={setWorkFormOpen}
                title={action == "CREATE" ? "Create work" : "Edit work"}
                form={
                    <WorkForm
                        action={action}
                        workData={popupWork}
                        setOpen={setWorkFormOpen}
                    />
                }
            />
        </>
    );
}

export default Profile;