"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import { FaClock } from "react-icons/fa6";

const PendingInvoice = () => {
  const [loading, setLoading] = useState(true);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const fetchTotalPendingAmount = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const invoicesData = revenueDataDoc.data().invoices;
      let pendingAmount = 0;

      for (const key in invoicesData) {
        const invoice = invoicesData[key];
        if (invoice.status === "pending") {
          pendingAmount += invoice.amount;
        }
      }
      setTotalPendingAmount(pendingAmount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalPendingAmount();
  }, []);
  return (
    <div>
      {loading ? (
        <Card className="space-y-5 p-4" radius="lg">
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
          <Card className="p-4" radius="lg">
            <h1 className="flex items-center gap-4">
              <span>
                <FaClock />
              </span>
              Pending
            </h1>
            <Card className="p-8 mt-2 text-center">
              <h2>${totalPendingAmount}</h2>
            </Card>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PendingInvoice;
