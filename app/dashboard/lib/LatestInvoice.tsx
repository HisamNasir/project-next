import React, { useState, useEffect } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";

const LatestInvoices = () => {
  const [loading, setLoading] = useState(true);
  const [latestInvoices, setLatestInvoices] = useState([]);
  const fetchLatestInvoices = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data().invoices;
      const sortedInvoices = invoicesData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      const latestInvoices = sortedInvoices.slice(0, 8);
      setLatestInvoices(latestInvoices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching latest invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestInvoices();
  }, []);
  const fetchCustomerDetails = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const customersData = revenueDataDoc.data().customers;
      const updatedInvoices = latestInvoices.map((invoice) => {
        const customer = customersData.find(
          (customer) => customer.id === invoice.customer_id
        );
        return { ...invoice, customer_name: customer.name };
      });
      setLatestInvoices(updatedInvoices);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };
  useEffect(() => {
    if (!loading) {
      fetchCustomerDetails();
    }
  }, [loading]);

  return (
    <div>
      <h1>Latest Invoices</h1>
      {loading ? (
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ) : (
        <div>
          <Card className="  p-4" radius="lg">
            <ul>
              {latestInvoices.map((invoice, index) => (
                <li className=" flex justify-between" key={index}>
                  <span>{invoice.customer_name}</span>{" "}
                  <span>${invoice.amount}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LatestInvoices;