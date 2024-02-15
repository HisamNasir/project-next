import React from "react";
import PendingInvoice from "./ui/PendingInvoice";
import CollectedInvoice from "./ui/CollectedInvoice";
import TotalInvoices from "./ui/TotalInvoice";
import TotalCustomers from "./ui/TotalCustomers";
import LatestInvoices from "./ui/LatestInvoice";
import RecentRevenue from "./ui/RecentRevenue";
const Dashboard = () => {
  return (
    <div>
      <p>Dashboard</p>
      <div className="m-2 p-4 border rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 border-white border-opacity-20">
        <PendingInvoice />
        <CollectedInvoice />
        <TotalInvoices />
        <TotalCustomers />
      </div>
      <div className="m-2 p-4 border rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-2 border-white border-opacity-20">
        <RecentRevenue />
        <LatestInvoices />
      </div>
    </div>
  );
};
export default Dashboard;
