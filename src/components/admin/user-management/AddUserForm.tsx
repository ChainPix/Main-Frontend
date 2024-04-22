import { Menu, Transition } from '@headlessui/react';
import Card from "components/card";
import InputField from 'components/fields/InputField';
import { Fragment, useState } from 'react';
export default function AddUserForm() {
    const roles = ["Normal", "Supervisor", "SuperUser"];
    const organizations = ["WOS", "WOSL"];
    const genders = ['Male', 'Female', 'Other']

    const [selectedRole, setSelectedRole] = useState('');
    return (
        <Card extra={"mb-3 w-full h-full px-6 pb-6 sm:overflow-x-auto reletive"}>
            <div className="relative flex items-center justify-between pt-4">
                <div className="text-xl font-bold text-navy-700 dark:text-white">
                    Add New User
                </div>
            </div>

            <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                <div className="mt-5 mb-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
                    <InputField
                        variant="auth"
                        extra="mb-3 mx-50"
                        label="User Name"
                        placeholder="Enter User Name"
                        id="username"
                        type="text"
                    // value={reason}
                    // onChange={(e) => setReason(e.target.value)}
                    />
                    <InputField
                        variant="auth"
                        extra="mb-3 mx-50"
                        label="Email"
                        placeholder="Enter User Email"
                        id="email"
                        type="text"
                    // value={reason}
                    // onChange={(e) => setReason(e.target.value)}
                    />
                </div>
                <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex justify-center flex-row pl-3 pt-1">
                        <Menu as="div" className="">
                            <div>
                                <Menu.Button className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                    <button className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                        Select Role
                                    </button>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Menu.Items className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {roles.map((role, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer focus:outline-none"
                                                            onClick={(e) => {
                                                                // e.preventDefault();
                                                                // handleLeaveTypeSelect(leaveType);
                                                            }}
                                                        >
                                                            <span className="font-semibold text-gray-900">{role}</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <input
                            disabled={true}
                            type="text"
                            id="leaveTypeInput"
                            placeholder="Selected Role"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
                        />
                    </div>
                    <div className="flex justify-center flex-row pl-3 pt-1">
                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                    <button className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                        Select Organization
                                    </button>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Menu.Items className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {roles.map((role, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer focus:outline-none"
                                                            onClick={(e) => {
                                                                // e.preventDefault();
                                                                // handleLeaveTypeSelect(leaveType);
                                                            }}
                                                        >
                                                            <span className="font-semibold text-gray-900">{role}</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <input
                            disabled={true}
                            type="text"
                            id="leaveTypeInput"
                            placeholder="Selected Organization"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
                        />
                    </div>
                </div>
                <div className="mt-5 mb-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex justify-center flex-row pl-3 pt-1">
                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                    <button className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                        Select Gender
                                    </button>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Menu.Items className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {roles.map((role, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer focus:outline-none"
                                                            onClick={(e) => {
                                                                // e.preventDefault();
                                                                // handleLeaveTypeSelect(leaveType);
                                                            }}
                                                        >
                                                            <span className="font-semibold text-gray-900">{role}</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <input
                            disabled={true}
                            type="text"
                            id="leaveTypeInput"
                            placeholder="Selected Gender"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
                        />
                    </div>
                    <div className="flex justify-center flex-row pl-3 pt-1">
                        <Menu as="div" className="relative">
                            <div>
                                <Menu.Button className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                    <button className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                        Select Supervisor
                                    </button>
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Menu.Items className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {roles.map((role, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <a
                                                            href="#"
                                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer focus:outline-none"
                                                            onClick={(e) => {
                                                                // e.preventDefault();
                                                                // handleLeaveTypeSelect(leaveType);
                                                            }}
                                                        >
                                                            <span className="font-semibold text-gray-900">{role}</span>
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </div>

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <input
                            disabled={true}
                            type="text"
                            id="leaveTypeInput"
                            placeholder="Selected Supervisor"
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                    // onClick={handleSubmit}
                    >
                        Register User
                    </button>
                </div>
            </div>
        </Card>
    );
}