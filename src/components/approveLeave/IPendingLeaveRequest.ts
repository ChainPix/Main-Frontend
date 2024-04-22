export type IPendingLeaveRequest = {
  _id: string;
  leave_start_date: string;
  leave_type: string;
  reason: string;
  date_of_request: string;
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: string;
  user_photoURL: string;
  organization: string;
  no_of_days: number;
};