"use client";
import React, { useState, useEffect } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import { FaPeopleGroup } from "react-icons/fa6";

const TotalCustomers = () => {
  const [loading, setLoading] = useState(true);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const fetchTotalCustomers = async () => {
    try {
      const revenueDataDoc = await getDoc(
        doc(firestore, "RevenueData", "Revenue")
      );
      const customersData = revenueDataDoc.data().customers;
      const numberOfCustomers = customersData.length;
      setTotalCustomers(numberOfCustomers);
      setLoading(false);
    } catch (error) {
      return { message: "Error fetching total number of customers:" };
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTotalCustomers();
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
          <Card className="p-4" radius="lg">
            <h1 className="flex items-center gap-4">
              <span>
                <FaPeopleGroup />
              </span>
              Total Customers
            </h1>
            <Card className="p-8 mt-2 text-center">
              <h2> {totalCustomers}</h2>
            </Card>
          </Card>
        </div>
      )}
    </div>
  );
};
export default TotalCustomers;
