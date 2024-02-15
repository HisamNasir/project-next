"use client";
import React, { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import clsx from "clsx";

interface Account {
  id: string;
  name: string;
}

interface Invoice {
  customer_id: string;
  amount: number;
  date: string;
  status: string;
}

interface Props {
  searchTerm: string;
}

const AccountList: React.FC<Props> = ({ searchTerm }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const customersData = revenueDataDoc.data()?.customers;
        if (customersData) {
          const filteredAccounts = customersData.filter(
            (account: Account) =>
              account.id.includes(searchTerm) ||
              account.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setAccounts(filteredAccounts);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    if (searchTerm) {
      fetchAccounts();
    }
  }, [searchTerm]);

  const handleAccountClick = async (customerId: string) => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data()?.invoices;
      if (invoicesData) {
        const filteredInvoices = invoicesData.filter(
          (invoice: Invoice) => invoice.customer_id === customerId
        );
        setInvoices(filteredInvoices);
        setSelectedAccount(customerId);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  return (
    <Card>
      {accounts.map((account: Account, index: number) => (
        <React.Fragment key={index}>
          <Button
            color={selectedAccount === account.id ? "primary" : "default"}
            className="m-2"
            onClick={() => handleAccountClick(account.id)}
          >
            <p>
              <span className="text-sm opacity-50">Name:</span>{" "}
              <span>{account.name}</span>
            </p>
          </Button>
          <Card className="m-2">
            {selectedAccount === account.id && (
              <div className="p-2 space-y-2">
                <h3>Invoices:</h3>
                <p className="text-xs">
                  <span className="opacity-50">ID:</span>{" "}
                  <span>{account.id}</span>
                </p>
                {invoices.map((invoice: Invoice, idx: number) => (
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
        </React.Fragment>
      ))}
    </Card>
  );
};

export default AccountList;
