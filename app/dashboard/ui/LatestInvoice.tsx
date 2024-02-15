"use client";
import React, { useState, useEffect } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import Link from "next/link";

interface Invoice {
  customer_id: string;
  amount: number;
  date: string;
  customer_name?: string;
}

const LatestInvoices: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [latestInvoices, setLatestInvoices] = useState<Invoice[]>([]);

  const fetchLatestInvoices = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data()?.invoices;
      if (invoicesData) {
        const sortedInvoices = invoicesData.sort((a: Invoice, b: Invoice) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        const latestInvoices = sortedInvoices.slice(0, 8);
        setLatestInvoices(latestInvoices);
      }
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
      const customersData = revenueDataDoc.data()?.customers;
      if (customersData) {
        const updatedInvoices = latestInvoices.map((invoice) => {
          const customer = customersData.find(
            (customer: any) => customer.id === invoice.customer_id
          );
          return { ...invoice, customer_name: customer?.name };
        });
        setLatestInvoices(updatedInvoices);
      }
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
    <div className="space-y-4">
      <h1>Latest Invoices</h1>
      {loading ? (
        <Card className="h-[400px] space-y-5 p-4" radius="lg">
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
          <Card className="min-h-[400px] space-y-5 p-4" radius="lg">
            <ul className="space-y-5 max-h-[380px] overflow-hidden overflow-y-scroll">
              {latestInvoices.map((invoice, index) => (
                <li key={index}>
                  <Link
                    className="flex justify-between"
                    href={`/invoices/${invoice.customer_id}`}
                    passHref
                  >
                    <span>{invoice.customer_name}</span>
                    <span>${invoice.amount}</span>
                  </Link>
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
