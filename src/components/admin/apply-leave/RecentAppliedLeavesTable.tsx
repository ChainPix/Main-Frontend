import Card from "components/card";
import { MdCancel, MdCheckCircle, MdOutlineError } from "react-icons/md";

type RowObj = {
  leave_type: string;
  status: string; 
  reason: string;
  date_of_request: string;
  no_of_days: number;
};

export default function RecentAppliedLeavesTable(props: Readonly<{ tableData: RowObj[] }>) {
  const { tableData } = props;
  console.log(tableData)
  const columns = [
    {
      id: "index",
      header: "#",
      cell: (info: any, index: number) => <p className="text-sm font-bold text-navy-700 dark:text-white">{index + 1}</p>,
    },
    {
      id: "leave_type",
      header: "Leave Type",
      cell: (info: any) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>,
    },
    {
      id: "status",
      header: "Status",
      cell: (info: any) => (
        <div className="flex items-center">
          {info.getValue() === "Approved" ? (
            <MdCheckCircle className="text-green-500 me-1 dark:text-green-300" />
          ) : info.getValue() === "Rejected" ? (
            <MdCancel className="text-red-500 me-1 dark:text-red-300" />
          ) : info.getValue() === "Pending" ? (
            <MdOutlineError className="text-amber-500 me-1 dark:text-amber-300" />
          ) : null}
          <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
        </div>
      ),
    },
    {
      id: "reason",
      header: "Reason",
      cell: (info: any) => <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>,
    },
    {
      id: "date_of_request",
      header: "Date",

      cell: (info: any) => {
        const date = new Date(info.getValue());
        const formattedDate = date.toISOString().split('T')[0];
        return (
          <p className="text-sm font-bold text-navy-700 dark:text-white">{formattedDate}</p>
        )
      },
    },
    {
      id: "no_of_days",
      header: "Days",
      cell: (info: any) => (
        <div className="flex items-center">
          <p className="text-sm font-bold text-navy-700 dark:text-white">{info.getValue()}</p>
        </div>
      ),
    },
  ];

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <div className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Previously Applied Leaves
        </div>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr className="!border-px !border-gray-400">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                >
                  <div className="items-center justify-between text-xs text-gray-200">
                    {column.header}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(tableData) && tableData.map((row, index) => (
              <tr key={index}>
                {columns.map((column, columnIndex) => (
                  <td key={column.id} className="min-w-[150px] border-white/0 py-3 pr-4">
                    {column.cell({ getValue: () => row[column.id] }, index)}
                  </td>
                ))}
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </Card>
  );
}
