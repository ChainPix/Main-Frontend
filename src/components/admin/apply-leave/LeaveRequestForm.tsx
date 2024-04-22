import { Menu, Transition } from '@headlessui/react';
import Card from "components/card";
import InputField from 'components/fields/InputField';
import { addDays } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { postLeaveRequest } from 'service/leaveRequestApi';
import { getLeaveTypes } from 'service/organizationApi';

export default function LeaveRequestForm() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const leaveTypesData = await getLeaveTypes();
        setLeaveTypes(leaveTypesData);
      } catch (error) {
        console.error('Error fetching leave types:', error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleLeaveTypeSelect = (leaveType) => {
    setSelectedLeaveType(leaveType);
  };

  const handleSubmit = async () => {
    const startDate = state[0].startDate;
    const endDate = state[0].endDate;
    const user_id = `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`;
    if (user_id && startDate && endDate && selectedLeaveType && reason) {
      const leaveRequestData = {
        user_id,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        leave_type: selectedLeaveType,
        reason
      };
      try {
        await postLeaveRequest(leaveRequestData);
        // Reset form after successful submission if needed
      } catch (error) {
        console.error('Error submitting leave request:', error);
        // Handle error
      }
    } else {
      console.error('Incomplete leave request data');
      // Handle incomplete data error
    }
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Leave Requesting Form
        </div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            variant="auth"
            extra="mb-3 mx-30"
            label="Reason"
            placeholder="Enter reason"
            id="reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <div className="flex justify-center flex-row pl-3 pt-1">
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="focus:outline-none inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  <button className="focus:outline-none linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                    Select Leave Type
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
                      {leaveTypes.map((leaveType, index) => (
                        <Menu.Item key={leaveType.leave_type_id}>
                          {({ active }) => (
                            <a
                              href="#"
                              className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 cursor-pointer focus:outline-none"
                              onClick={(e) => {
                                // e.preventDefault();
                                handleLeaveTypeSelect(leaveType);
                              }}
                            >
                              <span className="font-semibold text-gray-900">{leaveType}</span>
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
              placeholder="Select leave type"
              value={selectedLeaveType}
              onChange={(e) => setSelectedLeaveType(e.target.value)}
              className={`cursor-not-allowed ml-4 w-100 flex h-12 items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none `}
            />
          </div>
        </div>
        <p className="mb-2 mt-3 text-sm ">Select a Date Range : </p>
        <div className="flex justify-center">
          <div>
            <DateRangePicker
              onChange={item => setState([item.selection])}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={2}
              ranges={state}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="backwards"
              label="Select Date Range"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="linear px-10 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={handleSubmit}
          >
            Submit Leave Request
          </button>
        </div>
      </div>
    </Card>
  );
}
