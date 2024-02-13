"use client";
import React from "react";
import Layout from "./layout";
import { firestore } from "../utils/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import PendingInvoice from "./lib/PendingInvoice";
import CollectedInvoice from "./lib/CollectedInvoice";
import TotalInvoices from "./lib/TotalInvoice";
import TotalCustomers from "./lib/TotalCustomers";
import LatestInvoices from "./lib/LatestInvoice";
import RecentRevenue from "./lib/RecentRevenue";

const Dashboard = () => {
  // const uploadDataToFirestore = async () => {
  //   try {
  //     const data = {
  //       users: [
  //         {
  //           id: "410544b2-4001-4271-9855-fec4b6a6442a",
  //           name: "User",
  //           email: "user@nextmail.com",
  //           password: "123456",
  //         },
  //       ],

  //       customers: [
  //         {
  //           id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
  //           name: "Delba de Oliveira",
  //           email: "delba@oliveira.com",
  //           image_url: "/customers/delba-de-oliveira.png",
  //         },
  //         {
  //           id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
  //           name: "Lee Robinson",
  //           email: "lee@robinson.com",
  //           image_url: "/customers/lee-robinson.png",
  //         },
  //         {
  //           id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
  //           name: "Hector Simpson",
  //           email: "hector@simpson.com",
  //           image_url: "/customers/hector-simpson.png",
  //         },
  //         {
  //           id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
  //           name: "Steven Tey",
  //           email: "steven@tey.com",
  //           image_url: "/customers/steven-tey.png",
  //         },
  //         {
  //           id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
  //           name: "Steph Dietz",
  //           email: "steph@dietz.com",
  //           image_url: "/customers/steph-dietz.png",
  //         },
  //         {
  //           id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
  //           name: "Michael Novotny",
  //           email: "michael@novotny.com",
  //           image_url: "/customers/michael-novotny.png",
  //         },
  //         {
  //           id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
  //           name: "Evil Rabbit",
  //           email: "evil@rabbit.com",
  //           image_url: "/customers/evil-rabbit.png",
  //         },
  //         {
  //           id: "126eed9c-c90c-4ef6-a4a8-fcf7408d3c66",
  //           name: "Emil Kowalski",
  //           email: "emil@kowalski.com",
  //           image_url: "/customers/emil-kowalski.png",
  //         },
  //         {
  //           id: "CC27C14A-0ACF-4F4A-A6C9-D45682C144B9",
  //           name: "Amy Burns",
  //           email: "amy@burns.com",
  //           image_url: "/customers/amy-burns.png",
  //         },
  //         {
  //           id: "13D07535-C59E-4157-A011-F8D2EF4E0CBB",
  //           name: "Balazs Orban",
  //           email: "balazs@orban.com",
  //           image_url: "/customers/balazs-orban.png",
  //         },
  //       ],

  //       invoices: [
  //         {
  //           customer_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
  //           amount: 15795,
  //           status: "pending",
  //           date: "2022-12-06",
  //         },
  //         {
  //           customer_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
  //           amount: 20348,
  //           status: "pending",
  //           date: "2022-11-14",
  //         },
  //         {
  //           customer_id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
  //           amount: 3040,
  //           status: "paid",
  //           date: "2022-10-29",
  //         },
  //         {
  //           customer_id: "50ca3e18-62cd-11ee-8c99-0242ac120002",
  //           amount: 44800,
  //           status: "paid",
  //           date: "2023-09-10",
  //         },
  //         {
  //           customer_id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
  //           amount: 34577,
  //           status: "pending",
  //           date: "2023-08-05",
  //         },
  //         {
  //           customer_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
  //           amount: 54246,
  //           status: "pending",
  //           date: "2023-07-16",
  //         },
  //         {
  //           customer_id: "76d65c26-f784-44a2-ac19-586678f7c2f2",
  //           amount: 666,
  //           status: "pending",
  //           date: "2023-06-27",
  //         },
  //         {
  //           customer_id: "3958dc9e-737f-4377-85e9-fec4b6a6442a",
  //           amount: 32545,
  //           status: "paid",
  //           date: "2023-06-09",
  //         },
  //         {
  //           customer_id: "3958dc9e-787f-4377-85e9-fec4b6a6442a",
  //           amount: 1250,
  //           status: "paid",
  //           date: "2023-06-17",
  //         },
  //         {
  //           customer_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
  //           amount: 8546,
  //           status: "paid",
  //           date: "2023-06-07",
  //         },
  //         {
  //           customer_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
  //           amount: 500,
  //           status: "paid",
  //           date: "2023-08-19",
  //         },
  //         {
  //           customer_id: "d6e15727-9fe1-4961-8c5b-ea44a9bd81aa",
  //           amount: 8945,
  //           status: "paid",
  //           date: "2023-06-03",
  //         },
  //         {
  //           customer_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
  //           amount: 8945,
  //           status: "paid",
  //           date: "2023-10-04",
  //         },
  //         {
  //           customer_id: "3958dc9e-742f-4377-85e9-fec4b6a6442a",
  //           amount: 1000,
  //           status: "paid",
  //           date: "2022-06-05",
  //         },
  //       ],

  //       revenue: [
  //         { month: "Jan", revenue: 2000 },
  //         { month: "Feb", revenue: 1800 },
  //         { month: "Mar", revenue: 2200 },
  //         { month: "Apr", revenue: 2500 },
  //         { month: "May", revenue: 2300 },
  //         { month: "Jun", revenue: 3200 },
  //         { month: "Jul", revenue: 3500 },
  //         { month: "Aug", revenue: 3700 },
  //         { month: "Sep", revenue: 2500 },
  //         { month: "Oct", revenue: 2800 },
  //         { month: "Nov", revenue: 3000 },
  //         { month: "Dec", revenue: 4800 },
  //       ],
  //     };
  //     await setDoc(doc(firestore, "RevenueData", "Revenue"), data);

  //     console.log("Data uploaded successfully");
  //   } catch (error) {
  //     console.error("Error uploading data:", error);
  //   }
  // };

  return (
    <Layout>
      <div>
        <p>Dashboard</p>
        <div className="m-2 p-4 border rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 border-white border-opacity-20">
          <PendingInvoice />
          <CollectedInvoice />
          <TotalInvoices />
          <TotalCustomers />
          {/* <button onClick={uploadDataToFirestore}>Upload Data</button> */}
        </div>
        <div className="m-2 p-4 border rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-2 border-white border-opacity-20">
          <RecentRevenue />
          <LatestInvoices />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
