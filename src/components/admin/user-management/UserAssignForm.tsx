import { Menu, Transition } from '@headlessui/react';
import Card from "components/card";
import { Fragment, useState, useEffect } from 'react';
import { getUserByName, updateUserSupervisor } from 'service/userApi';
import DropdownWithSearch from './DropdownWithSearch';

export default function UserAssignForm() {
    const [selectedAssignee, setSelectedAssignee] = useState('');
    const [selectedSupervisor, setSelectedSupervisor] = useState('');
    const [assigneeList, setAssigneeList] = useState([]);
    const [supervisorList, setSupervisorList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const assignees = await getUserByName('assignees'); // Adjust according to your API
                const supervisors = await getUserByName('supervisors'); // Adjust according to your API
                setAssigneeList(assignees);
                setSupervisorList(supervisors);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, []);

    const handleAssigneeSelect = async (name) => {
        setSelectedAssignee(name);
    };

    const handleSupervisorSelect = (name) => {
        setSelectedSupervisor(name);
    };

    const handleAssign = async () => {
        try {
            const assigneeId = assigneeList.find(user => user.name === selectedAssignee)?._id;
            const supervisorId = supervisorList.find(user => user.name === selectedSupervisor)?._id;

            if (assigneeId && supervisorId) {
                await updateUserSupervisor(assigneeId, supervisorId);
                console.log('User supervisor updated successfully');
                // Show confirmation alert here
            } else {
                console.error('Assignee or Supervisor not found');
            }
        } catch (error) {
            console.error('Error updating user supervisor:', error);
        }
    };

    return (
        <Card extra={"mb-3 w-full h-full px-6 pb-6 relative"}>
            <div className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Assign Users
                </div>
            </div>
            <div className="mt-8 ">
                <div className="mt-5 mb-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
                    <DropdownWithSearch
                        users={assigneeList.map(user => user.name)}
                        menuButtonLabel="Select Assignee"
                        defaultInputValue={selectedAssignee}
                        defaultSearchValue=""
                        onSelect={handleAssigneeSelect}
                    />
                    <DropdownWithSearch
                        users={supervisorList.map(user => user.name)}
                        menuButtonLabel="Select Supervisor"
                        defaultInputValue={selectedSupervisor}
                        defaultSearchValue=""
                        onSelect={handleSupervisorSelect}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleAssign}
                        className="linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </Card>
    );
}
