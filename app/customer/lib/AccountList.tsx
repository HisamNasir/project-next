"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import clsx from "clsx";
import Image from "next/image";

const CustomerList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllAccounts = async () => {
      try {
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const customersData = revenueDataDoc.data().customers;
        setAccounts(customersData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAllAccounts();
  }, []);

  const handleAccountClick = async (customerId: string) => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data().invoices;
      const filteredInvoices = invoicesData.filter(
        (invoice: any) => invoice.customer_id === customerId
      );

      setInvoices(filteredInvoices);
      setSelectedAccount(customerId);
    } catch (error) {}
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.id.includes(searchTerm) ||
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      {filteredAccounts.map((account, index) => (
        <React.Fragment key={index}>
          <Button
            color={selectedAccount === account.id ? "primary" : "default"}
            className="m-2 p-4 h-auto"
            onClick={() => handleAccountClick(account.id)}
          >
            <div className="w-full">
              <div className="flex items-center">
                <div>
                  {account.image_url && (
                    <Image
                      width={80}
                      height={80}
                      src={account.image_url}
                      alt={account.name}
                      className="rounded-lg mr-4"
                    />
                  )}
                </div>
                <div className="text-left flex flex-col gap-3">
                  <p>
                    <span className="text-sm opacity-50">Name:</span>{" "}
                    <span>{account.name}</span>
                  </p>
                  <p>
                    <span className="text-sm opacity-50">ID:</span>{" "}
                    <span>{account.id}</span>
                  </p>
                  <p>
                    <span className="text-sm opacity-50">Email:</span>{" "}
                    <span>{account.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </Button>
          <Card className="m-2">
            {selectedAccount === account.id && (
              <div className="p-2 space-y-2">
                <h3>Invoices:</h3>
                <p className="text-xs">
                  <span className="opacity-50">ID:</span>{" "}
                  <span>{account.id}</span>
                </p>
                {invoices.map((invoice, idx) => (
                  <Card className="p-2 px-4" key={idx}>
                    <p>
                      <span className="text-sm text-gray-500">Amount:</span> $
                      {invoice.amount}
                    </p>
                    <p>
                      <span className="text-sm text-gray-500">Date:</span>{" "}
                      {invoice.date}
                    </p>
                    <p className="">
                      <span className="text-sm text-gray-500">Status:</span>{" "}
                      <span
                        className={clsx({
                          "text-blue-600": invoice.status === "paid",
                          "text-red-800": invoice.status === "pending",
                        })}
                      >
                        {invoice.status}
                      </span>
                    </p>
                  </Card>
                ))}
              </div>
            )}
          </Card>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default CustomerList;
