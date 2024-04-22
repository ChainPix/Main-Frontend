import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHourglass } from '@fortawesome/free-solid-svg-icons';

function LeaveRequestUpdateModel({ leaveRequest, onUpdate, onCancel }) {
  const [rejectReason, setRejectReason] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleConfirm = () => {
    if (leaveRequest.status === 'Approved') {
      onUpdate(leaveRequest._id, rejectReason); // Pass reason if needed
    } else {
      onUpdate(leaveRequest._id);
    }
    closeDialog();
  };

  const handleCancel = () => {
    onCancel();
    closeDialog();
  };

  const closeDialog = () => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setIsAnimating(false);
      //   setShowDialog(false); // Close dialog
    }, 300); // Animation duration
    return () => clearTimeout(timeout);
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-10 transition-opacity ${isAnimating ? 'opacity-0' : 'opacity-100'}`} onClick={handleCancel}> 
      <div className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm"></div>
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto relative transform transition-transform duration-300 scale-100" onClick={(e) => e.stopPropagation()}> 

        {/* Status Icon */}
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
            {leaveRequest.status === 'Approved' ? (
              <FontAwesomeIcon icon={faCheck} className="text-green-500" />
            ) : (
              <FontAwesomeIcon icon={faHourglass} className="text-yellow-500" />
            )}
          </div>
        </div>
        <h3 className="text-lg font-bold text-center mb-4">{leaveRequest.status === 'Approved' ? 'Reject Leave Request' : 'Approve Leave Request'}</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">Leave Type:</p>
            <p>{leaveRequest.leave_type}</p>
          </div>
          <div>
            <p className="font-bold">Status:</p>
            <p>{leaveRequest.status}</p>
          </div>
          <div>
            <p className="font-bold">Reason:</p>
            <p>{leaveRequest.reason}</p>
          </div>
          <div>
            <p className="font-bold">Leave Start Date:</p>
            <p>{leaveRequest.leave_start_date}</p>
          </div>
          <div>
            <p className="font-bold">Date of Request:</p>
            <p>{leaveRequest.date_of_request}</p>
          </div>
          <div>
            <p className="font-bold">User:</p>
            <p>{leaveRequest.user_name}</p>
          </div>
          <div>
            <p className="font-bold">User Role:</p>
            <p>{leaveRequest.user_role}</p>
          </div>
          <div>
            <p className="font-bold">Organization:</p>
            <p>{leaveRequest.organization}</p>
          </div>
          <div>
            <p className="font-bold">Number of Days:</p>
            <p>{leaveRequest.no_of_days}</p>
          </div>
          <div>
            <p className="font-bold">Approved Date:</p>
            <p>{leaveRequest.approved_date}</p>
          </div>
          {leaveRequest.status === 'Approved' && (
            <div className="col-span-2">
              <textarea
                className="mt-2 w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter rejection reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
          )}
          {leaveRequest.status === 'Rejected' && (
            <><div>
              <p className="font-bold">Rejected Date:</p>
              <p>{leaveRequest.rejected_date}</p>
            </div><div>
                <p className="font-bold">Rejected By:</p>
                <p>{leaveRequest.rejected_by.name}</p>
              </div><div>
                <p className="font-bold">Rejected Reason:</p>
                <p>{leaveRequest.rejected_reason}</p>
              </div></>
          )}
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={handleCancel}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" onClick={handleConfirm}>
            {leaveRequest.status === 'Approved' ? 'Reject' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequestUpdateModel;
