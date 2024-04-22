"use client"
import React, { useEffect, useState } from 'react';
import LeaveApprovalTable from 'components/approveLeave/LeaveApprovalTable';
import EvaluatedLeaveTable from 'components/approveLeave/EvaluatedLeaveTable'
import withSupervisorPrivilege from 'components/auth/supervisorPrivilege';
import withAuth from 'components/auth/withAuth';
import { getPendingLeaveRequestsForSupervisor, getEvaluatedLeaveRequestsBySupervisor } from 'service/leaveRequestApi';
import { IPendingLeaveRequest } from 'components/approveLeave/IPendingLeaveRequest';
import { IEvaluatedLeaveRequest } from 'components/approveLeave/IEvaluatedLeaveRequest';

const Marketplace = () => {
    const [pendingLeaveRequests, setPendingLeaveRequests] = useState<IPendingLeaveRequest[]>([]);
    const [evaluatedLeaveRequests, setEvaluatedLeaveRequests] = useState<IEvaluatedLeaveRequest[]>([]);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const leaveRequestsData = await getPendingLeaveRequestsForSupervisor();
                setPendingLeaveRequests(leaveRequestsData);
            } catch (error) {
                console.error('Error fetching pending leave requests:', error);
            }

            try {
                const evaluatedLeaveRequestsData = await getEvaluatedLeaveRequestsBySupervisor();
                setEvaluatedLeaveRequests(evaluatedLeaveRequestsData);
                console.log(evaluatedLeaveRequestsData);
            } catch (error) {
                console.error('Error fetching evaluated leave requests:', error);
            }
        };

        fetchLeaveRequests();
    }, []);

    return (
        <div className="mt-3 h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            <LeaveApprovalTable tableData={pendingLeaveRequests} />
            <div className="mt-3">
                <EvaluatedLeaveTable tableData={evaluatedLeaveRequests} />
            </div>
        </div>
    );
};

export default withSupervisorPrivilege(withAuth(Marketplace));
