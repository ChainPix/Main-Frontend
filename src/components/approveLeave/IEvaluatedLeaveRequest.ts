export interface IEvaluatedLeaveRequest {
    _id: string;
    leave_start_date: string;
    leave_type: string;
    status: string;
    reason: string;
    date_of_request: string;
    user_id: string;
    user_name: string;
    user_role: string;
    user_photoURL: string;
    organization: string;
    no_of_days: number;
    approved_date: string | null;
    approved_by: {
      _id: string;
      name: string;
      role: string;
      photoURL: string;
      organization: string;
    } | {};
    rejected_date: string | null;
    rejected_by: {
      _id: string;
      name: string;
      role: string;
      photoURL: string;
      organization: string;
    } | {};
    rejected_reason: string | null;
  }
  