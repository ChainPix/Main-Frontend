'use client';
import AssigneesAvailabityTable from 'components/admin/default/AssigneesAvailabityTable';
import withAuth from 'components/auth/withAuth';
import Widget from 'components/widget/Widget';
import { useEffect, useState } from 'react';
import { MdBarChart } from 'react-icons/md';
import { getRemainingLeaves } from 'service/leaveRequestApi';
import tableDataComplex from 'variables/data-tables/tableDataComplex';

const Dashboard = () => {
  const isSupervisor = document.cookie.split(';').some((c) => c.trim().startsWith('role=Supervisor'));
  const [remainingLeaves, setRemainingLeaves] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const leaves = await getRemainingLeaves();
        setRemainingLeaves(leaves);
      } catch (error) {
        console.error('Error fetching remaining leaves:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
          My Remaining Leaves
        </h4>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-6">
        {remainingLeaves.map((leaveType, index) => (
          <Widget
            key={index} // Add a key prop
            icon={<MdBarChart className="h-7 w-7" />}
            // icon={<IoMdHome className="h-7 w-7" />}
            // icon={<IoDocuments className="h-7 w-7" />}
            // icon={<MdDashboard className="h-7 w-7" />}
            title={leaveType.leave_type_name}
            subtitle={`${leaveType.remaining_days}`}
          />
        ))}
      </div>
      {/* Supervisor Section */}
      {isSupervisor && (
        <div className="mt-5">
          <div className="mb-5 flex items-center justify-between px-[26px]">
          </div>
          <div className="mt-3 ">
            <AssigneesAvailabityTable tableData={tableDataComplex} />
          </div>
        </div>
      )}
    </div>

  );
};

export default withAuth(Dashboard);
