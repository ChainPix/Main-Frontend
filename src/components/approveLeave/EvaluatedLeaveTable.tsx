import Card from 'components/card';
import Image from 'next/image';
import { useState } from 'react';
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { updateApprovedLeaveRequest, updateRejectedLeaveRequest } from 'service/leaveRequestApi';
import { IEvaluatedLeaveRequest } from './IEvaluatedLeaveRequest';
import LeaveRequestUpdateModel from './LeaveRequestUpdateModel';
import SLFlag from '/public/img/country/sl.png';
import UKFlag from '/public/img/country/uk.png';

function EvaluatedLeaveTable(props: { tableData: IEvaluatedLeaveRequest[] }) {
  const { tableData } = props;
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState<IEvaluatedLeaveRequest | null>(null);

  const handleUpdate = (leaveRequest: IEvaluatedLeaveRequest) => {
    setSelectedLeaveRequest(leaveRequest);
  };

  const handleUpdateConfirm = async (leaveRequestId: string, rejectReason?: string) => {
    try {
      if (rejectReason) {
        // Update rejected leave request
        await updateRejectedLeaveRequest(leaveRequestId, rejectReason);
      } else {
        // Update approved leave request
        await updateApprovedLeaveRequest(leaveRequestId, 'approvedBy', 'rejectedReason');
      }
      setSelectedLeaveRequest(null); // Close the modal after update
      // You may need to update tableData or fetch new data here
    } catch (error) {
      console.error('Error updating leave request:', error);
    }
  };

  const handleUpdateCancel = () => {
    setSelectedLeaveRequest(null); // Close the modal
  };

  return (
    <Card extra={'w-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Evaluated Leave Requests
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr className="!border-px !border-gray-400">
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Index
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Name
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Organization/Role
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Leave Start Date
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Leave Type
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Reason
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Status
              </th>
              <th className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start">
                Action
              </th>
            </tr>
          </thead>
          {tableData.length === 0 ? (
            <div className="flex items-center mt-4 mb-4">
              <p className="text-md font-medium text-gray-600 dark:text-white">
                No leave requests :(
              </p>
            </div>
          ) : (
            <tbody>
              {tableData.map((leaveRequest, index) => (
                <tr key={leaveRequest._id}>
                  <td className="min-w-[50px] border-white/0 py-3 pr-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-white">
                      {index + 1}
                    </p>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <Image
                          width={30}
                          height={30}
                          src={leaveRequest.user_photoURL}
                          className="rounded-full"
                          alt=""
                        />
                      </div>
                      <p className="text-sm font-medium text-navy-700 dark:text-white">
                        {leaveRequest.user_name}
                      </p>
                    </div>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <div className="flex">
                      {leaveRequest.organization === 'WOSL' ? (
                        <Image width={30} height={20} src={SLFlag} alt="" />
                      ) : (
                        <Image width={30} height={20} src={UKFlag} alt="" />
                      )}
                      <p className="text-sm font-medium text-gray-600 dark:text-white mt-1 ml-3">
                        {leaveRequest.user_role}
                      </p>
                    </div>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-white">
                      {leaveRequest.leave_start_date}
                    </p>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-white">
                      {leaveRequest.leave_type}
                    </p>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-white">
                      {leaveRequest.reason}
                    </p>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <div className="flex items-center">
                      {leaveRequest.status === "Approved" ? (
                        <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
                      ) : leaveRequest.status === "Rejected" ? (
                        <MdCancel className="text-red-500 me-1 dark:text-red-300" />
                      ) : null}
                      <p className="text-sm font-bold text-navy-700 dark:text-white">{leaveRequest.status}</p>
                    </div>
                  </td>
                  <td className="min-w-[100px] border-white/0 py-3 pr-4">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                      onClick={() => handleUpdate(leaveRequest)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      {/* Leave request update model */}
      {selectedLeaveRequest && (
        <LeaveRequestUpdateModel
          leaveRequest={selectedLeaveRequest}
          onUpdate={handleUpdateConfirm}
          onCancel={handleUpdateCancel}
        />
      )}
    </Card>
  );
}

export default EvaluatedLeaveTable;
