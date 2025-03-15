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

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {

    const { works, worksLoading, fetchAllWorks } = useWorkStore();

    const [action, setAction] = useState<"CREATE" | "UPDATE">("CREATE");

    const [workFormOpen, setWorkFormOpen] = useState(false);
    const [popupWork, setPopupWork] = useState<IWork>({});

    const handlePopup = async (w: IWork, a: "CREATE" | "UPDATE") => {
        setAction(a);
        setPopupWork(w);
        setWorkFormOpen(true);
    }

    useEffect(() => {
        fetchAllWorks();
    }, []);

    const workTable = (
        <table className='dashboard-table  w-full border-separate border-spacing-x-[30px] border-spacing-y-[10px] border-none mx-[-30px]'>
            <tbody>
                <tr>
                    <th className="text-left border-none">Company name</th>
                    <th className="text-left border-none">Title</th>
                    <th className="text-left border-none">Date</th>
                    <th className="text-left border-none">Created at</th>
                    <th className="text-left border-none">Action</th>
                </tr>
                {
                    worksLoading ? (
                        Array.from(new Array(5)).map((_, index) => (
                            <tr key={index}>
                                <td><Skeleton variant="text" width="100%" /></td>
                                <td><Skeleton variant="text" width="100%" /></td>
                                <td><Skeleton variant="text" width="100%" /></td>
                                <td><Skeleton variant="text" width="100%" /></td>
                                <td><Skeleton variant="text" width="100%" /></td>
                            </tr>
                        ))
                    ) : (
                        works && works.map((work) => {
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
                        })
                    )
                }
            </tbody>
        </table>
    )

    return (
        <>
            <Card
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
                        popupWork={popupWork}
                        setOpen={setWorkFormOpen}
                    />
                }
            />
        </>
    );
}

export default Profile;