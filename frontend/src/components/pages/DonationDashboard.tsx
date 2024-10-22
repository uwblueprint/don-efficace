import React from "react";
import ValueDonatedPerCause from "../common/ValueDonatedPerCause";
import Logout from "../auth/Logout";

const DonationDashboard: React.FC = () => {
  return (
    <div>
      {/* Temporary place to put ValueDonatedPerCause component, below the dashboard */}
      <ValueDonatedPerCause />

      <Logout />
    </div>
  );
};

export default DonationDashboard;
