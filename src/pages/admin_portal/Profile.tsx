import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from 'src/store';

import { IconButton, Skeleton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';

import MoreOptionButton from 'src/components/admin_portal/MoreOptionButton';
import DashboardContainer from 'src/components/admin_portal/DashboardContainer/DashboardContainer';
import PopupForm from 'src/components/admin_portal/PopupForm/PopupForm';
import WorkForm from 'src/components/admin_portal/_form/WorkForm';
import { IWork } from 'src/services/api/workService';
import { readableDate } from 'src/utils/common';
import { fetchGetAllWorks } from 'src/reducer/work/getAllWorks';

interface ProfileProps {
}

const Profile: React.FC<ProfileProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { works: works, loading: getAllWorksLoading, error: getAllWorksError } = useSelector((state: RootState) => state.getAllWorksReducer);

    const [action, setAction] = useState<"CREATE" | "UPDATE">("CREATE");

    const [workFormOpen, setWorkFormOpen] = useState(false);
    const [popupWork, setPopupWork] = useState<IWork>({});

    const handlePopup = async (w: IWork, a: "CREATE" | "UPDATE") => {
        setAction(a);
        setPopupWork(w);
        setWorkFormOpen(true);
    }

    useEffect(() => {
        dispatch(fetchGetAllWorks());
    }, [dispatch]);

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
                    getAllWorksLoading ? (
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
                        works.map((work) => {
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