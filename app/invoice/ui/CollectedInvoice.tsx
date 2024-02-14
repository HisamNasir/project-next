import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Skeleton } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import { FaDollarSign } from "react-icons/fa6";

const CollectedInvoice = () => {
  const [loading, setLoading] = useState(true);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  const fetchTotalPaidAmount = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );

      const invoicesData = revenueDataDoc.data().invoices;
      let paidAmount = 0;
      for (const key in invoicesData) {
        const invoice = invoicesData[key];
        if (invoice.status === "paid") {
          paidAmount += invoice.amount;
        }
      }
      setTotalPaidAmount(paidAmount);
      setLoading(false);
    } catch (error) {
      return { message: "Error fetching total paid amount:" };
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTotalPaidAmount();
  }, []);

  return (
    <div>
      {loading ? (
        <Card className=" space-y-5 p-4" radius="lg">
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
          <Card className=" p-4" radius="lg">
            <h1 className="flex items-center gap-4">
              <span>
                <FaDollarSign />
              </span>
              Collected
            </h1>
            <Card className="p-8 mt-2 text-center">
              <h2>${totalPaidAmount}</h2>
            </Card>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CollectedInvoice;
