"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import clsx from "clsx";
const AccountList = ({ searchTerm }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const customersData = revenueDataDoc.data().customers;
        const filteredAccounts = customersData.filter(
          (account) =>
            account.id.includes(searchTerm) ||
            account.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setAccounts(filteredAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    if (searchTerm) {
      fetchAccounts();
    }
  }, [searchTerm]);

  const handleAccountClick = async (customerId) => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data().invoices;

      // Filter invoices based on customer_id
      const filteredInvoices = invoicesData.filter(
        (invoice) => invoice.customer_id === customerId
      );

      setInvoices(filteredInvoices);
      setSelectedAccount(customerId);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <Card>
      {accounts.map((account, index) => (
        <>
          <Button
            color={selectedAccount === account.id ? "primary" : "default"}
            className="m-2"
            key={index}
            onClick={() => handleAccountClick(account.id)}
          >
            <p>
              <span className=" text-sm opacity-50">Name:</span>{" "}
              <span>{account.name}</span>
            </p>
          </Button>
          <Card className="m-2">
            {selectedAccount === account.id && (
              <div className="p-2 space-y-2">
                <h3>Invoices:</h3>
                <p className=" text-xs">
                  <span className="opacity-50">ID:</span>
                  <span> {account.id}</span>
                </p>
                {invoices.map((invoice, idx) => (
                  <Card className="p-2 px-4" key={idx}>
                    <p>
                      <span className=" text-sm text-gray-500">Amount:</span> $
                      {invoice.amount}
                    </p>
                    <p>
                      <span className=" text-sm text-gray-500">Date:</span>{" "}
                      {invoice.date}
                    </p>
                    <p className="">
                      <span className=" text-sm text-gray-500">Status:</span>{" "}
                      <span
                        className={clsx({
                          "text-blue-500": invoice.status === "paid",
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
        </>
      ))}
    </Card>
  );
};

export default AccountList;
