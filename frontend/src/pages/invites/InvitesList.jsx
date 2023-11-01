import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/layout/Navbar";

const InvitesList = () => {
  const [invites, setInvites] = useState([]);

  // Get userId state from Redux store
  const userId = useSelector((state) => state.userId);

  const getInvites = () => {};

  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-4">
        <table className="w-1/2 border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md w-[350px]">
                From
              </th>
              <th className="border border-slate-600 rounded-md pl-3">Type</th>
              {/* max-md:hidden hides this column on mobile devices and tablets */}
              <th className="border border-slate-600 rounded-md w-[180px]">
                Operations
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};

export default InvitesList;
