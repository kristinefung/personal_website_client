import { useState, useEffect } from 'react';

import DashboardContainer from 'src/components/admin_portal/DashboardContainer/DashboardContainer';
import PopupForm from 'src/components/admin_portal/PopupForm/PopupForm';
import WorkService, { type Work } from 'src/services/api/workService';
import { readableDate } from 'src/utils/common';

import './Profile.css';

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
    const [works, setWorks] = useState<Work[]>([]);
    const [isLoadingWork, setIsLoadingWork] = useState(true);
    const [workError, setWorkError] = useState<string | null>(null);

    const [open, setOpen] = useState(false);

    const workService = WorkService();

    const fetchWorks = async () => {
        setIsLoadingWork(true);
        try {
            const works = await workService.getAllWorks();
            setWorks(works);
        } catch (err) {
            if (err instanceof Error) {
                setWorkError(err.message);
            } else {
                setWorkError("Unknown error");
            }
        } finally {
            setIsLoadingWork(false);
        }
    };

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
                                {readableDate(work.startMonth, work.startYear, work.endMonth, work.endYear, work.isCurrent === 1)}
                            </td>
                            <td>
                                {work.createdAt.toString()}
                            </td>
                            <td>
                                <button onClick={() => setOpen(true)}>
                                    Edit
                                </button>
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
                buttonGroup={(<div>Button</div>)}
                body={workTable}
                flex={1}
            />
            <PopupForm
                open={open}
                setOpen={setOpen}
                title='Edit Work'
                form={<></>}
            />
        </>
    );
}

export default Profile;