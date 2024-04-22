import Card from 'components/card';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { approveLeaveRequest, rejectLeaveRequest } from 'service/leaveRequestApi';
import AlertDialog from './AlertDialog';
import { IPendingLeaveRequest } from './IPendingLeaveRequest';
import SLFlag from '/public/img/country/sl.png';
import UKFlag from '/public/img/country/uk.png';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

function LeaveApprovalTable(props: { tableData: IPendingLeaveRequest[] }) {
  const [tableData, setTableData] = useState<IPendingLeaveRequest[]>(props.tableData);
  useEffect(() => {
    setTableData(props.tableData);
  }, [props.tableData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogMessage, setDialogMessage] = useState('');
  const [leaveRequestId, setLeaveRequestId] = useState('');
  const [loading, setLoading] = useState(false);


  const handleApprove = (leaveRequestId) => {
    console.log('Approve Leave Request', leaveRequestId);
    setDialogTitle('Approve Leave Request');
    setDialogMessage('Are you sure you want to approve this leave request?');
    setLeaveRequestId(leaveRequestId);
    setShowDialog(true);
  };

  const handleReject = (leaveRequestId) => {
    setDialogTitle('Reject Leave Request');
    setDialogMessage('Please specify a reason for rejection');
    setLeaveRequestId(leaveRequestId);
    setShowDialog(true);
  };

  const handleDialogConfirm = async (reason = '') => {
    setShowDialog(false);
    setLoading(true);

    try {
      if (dialogTitle === 'Approve Leave Request') {
        await approveLeaveRequest(leaveRequestId);
      } else {
        await rejectLeaveRequest(leaveRequestId, reason);
      }
      const updatedTableData = tableData.filter(row => row._id !== leaveRequestId);
      setTableData(updatedTableData);
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  const handleDialogCancel = () => {
    setShowDialog(false);
  };

  const columns = [
    {
      id: 'index',
      accessor: 'index',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">#</p>,
      cell: (info: any) => (
        <p className="text-sm font-medium text-gray-600 dark:text-white">{info.row.index + 1}</p>
      )
    },
    columnHelper.accessor('user_name', {
      id: 'user_name',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Name</p>,
      cell: (info: any) => (
        <div className="flex items-center gap-2">
          <div className="h-[30px] w-[30px] rounded-full">
            <Image
              width={30}
              height={30}
              src={info.row.original.user_photoURL}
              className="rounded-full"
              alt=""
            />
          </div>
          <p className="text-sm font-medium text-navy-700 dark:text-white">
            {info.row.original.user_name}
          </p>
        </div>
      ),
    }),
    {
      id: 'organization_role',
      accessor: 'organization_role',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Organization/Role</p>,
      cell: (info: any) => (
        <div className='flex'>
          {info.row.original.organization === 'WOSL' ? (
            <Image
              width={30}
              height={20}
              src={SLFlag}
              alt="Sri Lankan Flag"
            />
          ) : (
            <Image
              width={30}
              height={20}
              src={UKFlag}
              alt="United Kingdom Flag"
            />
          )}
          <p className="text-sm font-medium text-gray-600 dark:text-white mt-1 ml-3">{info.row.original.user_role}</p>
        </div>
      ),
    },
    columnHelper.accessor('leave_start_date', {
      id: 'leave_start_date',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Leave Start Date</p>,
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.row.original.leave_start_date}
        </p>
      ),
    }),
    columnHelper.accessor('leave_type', {
      id: 'leave_type',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Leave Type</p>,
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.row.original.leave_type}
        </p>
      ),
    }),
    columnHelper.accessor('reason', {
      id: 'reason',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Reason</p>,
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.row.original.reason}
        </p>
      ),
    }),
    columnHelper.accessor('date_of_request', {
      id: 'date_of_request',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Requested Date</p>,
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.row.original.date_of_request}
        </p>
      ),
    }),
    columnHelper.accessor('no_of_days', {
      id: 'no_of_days',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Number of Days</p>,
      cell: (info) => (
        <p className="text-md font-medium text-gray-600 dark:text-white">
          {info.row.original.no_of_days}
        </p>
      ),
    }),
    {
      id: 'actions',
      accessor: 'actions',
      header: () => <p className="text-sm font-bold text-gray-600 dark:text-white">Actions</p>,
      cell: (info: any) => (
        <div className="flex gap-2">
          <button className="bg-green-500 text-white px-3 py-1 rounded-md" onClick={() => handleApprove(info.row.original._id)}>Approve</button>
          <button className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={() => handleReject(info.row.original._id)}>Reject</button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Leave Requests from My Assignees
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {tableData.length === 0 ? (
            <div className="flex items-center mt-4 
      mb-4">
              <p className="text-md font-medium text-gray-600 dark:text-white">
                No leave requests :(
              </p>
            </div>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, 5)
                .map((row) => {
                  return (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            className="min-w-[100px] border-white/0 py-3  pr-4"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>
      {loading && <p className="text-md font-medium text-gray-600 dark:text-white">Loading...</p>}
      {showDialog && (
        <AlertDialog
          title={dialogTitle}
          message={dialogMessage}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
          setShowDialog={setShowDialog}
        />
      )}
    </Card>
  );
}

export default LeaveApprovalTable;
const columnHelper = createColumnHelper<IPendingLeaveRequest>();
