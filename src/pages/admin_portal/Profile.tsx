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

    const { works, worksLoading, workFormId, fetchAllWorks, setWorkFormId } = useWorkStore();

    const [action, setAction] = useState<"CREATE" | "UPDATE">("CREATE");

    const [workFormOpen, setWorkFormOpen] = useState(false);

    const handleEditPopup = async (id: number | null) => {
        setAction('UPDATE');
        setWorkFormId(id);
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

    // const workTable = (
    //     <table className='dashboard-table  w-full border-separate border-spacing-x-[30px] border-spacing-y-[10px] border-none mx-[-30px]'>
    //         <tbody>
    //             <tr>
    //                 <th className="text-left border-none">Company name</th>
    //                 <th className="text-left border-none">Title</th>
    //                 <th className="text-left border-none">Date</th>
    //                 <th className="text-left border-none">Created at</th>
    //                 <th className="text-left border-none">Action</th>
    //             </tr>
    //             {
    //                 worksLoading ? (
    //                     Array.from(new Array(5)).map((_, index) => (
    //                         <tr key={index}>
    //                             <td><Skeleton variant="text" width="100%" /></td>
    //                             <td><Skeleton variant="text" width="100%" /></td>
    //                             <td><Skeleton variant="text" width="100%" /></td>
    //                             <td><Skeleton variant="text" width="100%" /></td>
    //                             <td><Skeleton variant="text" width="100%" /></td>
    //                         </tr>
    //                     ))
    //                 ) : (
    //                     works && works.map((work) => {
    //                         return (
    //                             <tr key={work.id}>
    //                                 <td>
    //                                     {work.companyName}
    //                                 </td>
    //                                 <td>
    //                                     {work.title}
    //                                 </td>
    //                                 <td>
    //                                     {readableDate(work.startMonth!, work.startYear!, work.endMonth!, work.endYear!, work.isCurrent === 1)}
    //                                 </td>
    //                                 <td>
    //                                     {work.createdAt!.toString()}
    //                                 </td>
    //                                 <td>
    //                                     <IconButton
    //                                         style={{ color: '#FFFFFF', padding: '5px' }}
    //                                         onClick={() => handlePopup(work, "UPDATE")}>
    //                                         <EditIcon />
    //                                     </IconButton>
    //                                 </td>
    //                             </tr>
    //                         )
    //                     })
    //                 )
    //             }
    //         </tbody>
    //     </table>
    // )

    return (
        <>
            {/* <Card
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
            /> */}
            <Table
                title='Work'
                isLoading={worksLoading}
                columns={columns}
                data={data}
                handleOnClickEdit={handleEditPopup}
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