import axios from 'axios';
import { IPendingLeaveRequest } from 'components/approveLeave/IPendingLeaveRequest';
import { IEvaluatedLeaveRequest } from 'components/approveLeave/IEvaluatedLeaveRequest';

const apiDef = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// post a leave request
export const postLeaveRequest = async (leaveRequestData: any) => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        const response = await apiDef.post('/api/leaves', leaveRequestData);
        return response.data;
    } catch (error) {
        console.error('Error posting leave request:', error);
        throw error;
    }
}

// get previous leave requests
export const getLeaveRequests = async () => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        const user_id = `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`;
        const response = await apiDef.get('/api/leaves/user/' + user_id);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        throw error;
    }
}

// get all remaining leaves
export const getRemainingLeaves = async () => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        const user_id = `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`;
        const response = await apiDef.get('/api/leaves/remaining/' + user_id);
        return response.data;
    } catch (error) {
        console.error('Error fetching remaining leaves:', error);
        throw error;
    }
}

// get all pending leave requests from users when the supervisorId is given
export const getPendingLeaveRequestsForSupervisor = async (): Promise<IPendingLeaveRequest[]> => {
    try {
        const supervisorId = `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`;
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        const response = await apiDef.get('/api/leaves/pending/supervisor/' + supervisorId);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        throw error;
    }
}

// approve a leave request by the supervisor, need to add the supervisorId, approved day to the leave request
export const approveLeaveRequest = async (leaveRequestId: string) => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        // add userId to the request body as approved_by
        const body = {
            approved_by: `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`,
        };
        const response = await apiDef.patch('/api/leaves/approve/' + leaveRequestId, body);
        return response.data;
    } catch (error) {
        console.error('Error approving leave request:', error);
        throw error;
    }
}

// reject a leave request by the supervisor, need to add the supervisorId, rejected day to the leave request
export const rejectLeaveRequest = async (leaveRequestId: string, rejectedReason: string) => {
    try {
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        // add userId to the request body as rejected_by
        const body = {
            rejected_by: `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`,
            rejected_reason: rejectedReason,
        };
        const response = await apiDef.patch('/api/leaves/reject/' + leaveRequestId, body);
        return response.data;
    } catch (error) {
        console.error('Error rejecting leave request:', error);
        throw error;
    }
}

// get all leave requests that evaluated by supervisor when the supervisorId is given
export const getEvaluatedLeaveRequestsBySupervisor = async (): Promise<IEvaluatedLeaveRequest[]> => {
    try {
        const supervisorId = `${document.cookie.split(';').find(c => c.trim().startsWith('userId=')).split('=')[1]}`;
        apiDef.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.split(';').find(c => c.trim().startsWith('authToken=')).split('=')[1]}`;
        const response = await apiDef.get('/api/leaves/history/supervisor/' + supervisorId);
        return response.data;
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        throw error;
    }
}

// patch method to update a rejected leave request to approved status by supplying relevant information
export const updateRejectedLeaveRequest = async (leaveRequestId: string, approvedBy: string) => {
    try {
        const body = {
            approved_by: approvedBy
        };
        const response = await apiDef.patch('/api/leaves/update/rejected/' + leaveRequestId, body);
        return response.data;
    } catch (error) {
        console.error('Error updating rejected leave request:', error);
        throw error;
    }
}

// patch method to update an approved leave request to rejected status by supplying relevant information
export const updateApprovedLeaveRequest = async (leaveRequestId: string, rejectedBy: string, rejectedReason: string) => {
    try {
        const body = {
            rejected_by: rejectedBy,
            rejected_reason: rejectedReason,
        };
        const response = await apiDef.patch('/api/leaves/update/approved/' + leaveRequestId, body);
        return response.data;
    } catch (error) {
        console.error('Error updating approved leave request:', error);
        throw error;
    }
}