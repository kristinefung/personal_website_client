import DashboardContainer from 'src/components/admin_portal/DashboardContainer/DashboardContainer';

import './Profile.css';

interface ProfileProps {
}

const workTable = (
    <table className='dashboard-table'>
        <tbody>
            <tr>
                <th>Degree</th>
                <th>Subject</th>
                <th>School Name</th>
                <th>Date</th>
                <th>Created At</th>
                <th>Action</th>
            </tr>
            <tr>
                <td>
                    ABC degree
                </td>
                <td>
                    Music
                </td>
                <td>
                    Harvard University
                </td>
                <td>
                    09/2020 - 08/2024
                </td>
                <td>
                    12/12/2024
                </td>
                <td>
                    Edit
                </td>
            </tr>
            <tr>
                <td>
                    Diamond Degree
                </td>
                <td>
                    Mathematics
                </td>
                <td>
                    Harvard University
                </td>
                <td>
                    09/2016 - 08/2020
                </td>
                <td>
                    02/01/2025
                </td>
                <td>
                    Edit
                </td>
            </tr>
        </tbody>
    </table>
)

const Profile: React.FC<ProfileProps> = () => {
    return (
        <>
            <DashboardContainer
                title='Work'
                buttonGroup={(<div>Button</div>)}
                body={workTable}
                flex={1}
            />
            {/* <DashboardContainer
                title='Experience'
                buttonGroup={(<div>Button</div>)}
                body={(<div className='test'>
                    <div style={{ width: '1500px' }}>Item 2</div>
                </div>)}
                flex={1}
            /> */}
        </>
    );
}

export default Profile;