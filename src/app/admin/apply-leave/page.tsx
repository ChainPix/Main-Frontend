'use client';
import LeaveRequestForm from 'components/admin/apply-leave/LeaveRequestForm';
import RecentAppliedLeavesTable from 'components/admin/apply-leave/RecentAppliedLeavesTable';
import withAuth from 'components/auth/withAuth';
import { useEffect, useState } from 'react';
import { getLeaveRequests } from 'service/leaveRequestApi';

const Marketplace = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaveRequestsData = await getLeaveRequests();
        setLeaveRequests(leaveRequestsData);
      } catch (error) {
        console.error('Error fetching leave requests: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-3 h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="mb-5"><RecentAppliedLeavesTable tableData={leaveRequests} /></div>
      <div><LeaveRequestForm /></div>
    </div>
  );
};

export default withAuth(Marketplace);
