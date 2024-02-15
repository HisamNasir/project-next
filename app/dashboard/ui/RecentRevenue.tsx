"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";
import { Card, Skeleton } from "@nextui-org/react";

const RevenueChart = () => {
  const [loading, setLoading] = useState(true);
  const [revenueData, setRevenueData] = useState({});

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const Chart = await import("chart.js/auto");
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const invoicesData = revenueDataDoc.data().invoices;
        let latestDate = new Date();
        for (const invoice of invoicesData) {
          const invoiceDate = new Date(invoice.date);
          if (invoiceDate > latestDate) {
            latestDate = invoiceDate;
          }
        }
        const twelveMonthsAgo = new Date(
          latestDate.getFullYear(),
          latestDate.getMonth() - 11,
          latestDate.getDate()
        );
        const revenueByMonth = {};
        let currentDate = new Date(twelveMonthsAgo);
        while (currentDate <= latestDate) {
          const formattedMonth = `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }`;
          revenueByMonth[formattedMonth] = 0;
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
        for (const invoice of invoicesData) {
          const invoiceDate = new Date(invoice.date);
          if (invoiceDate >= twelveMonthsAgo && invoiceDate <= latestDate) {
            const formattedMonth = `${invoiceDate.getFullYear()}-${
              invoiceDate.getMonth() + 1
            }`;
            revenueByMonth[formattedMonth] += invoice.amount;
          }
        }
        const labels = Object.keys(revenueByMonth);
        const data = Object.values(revenueByMonth);
        setRevenueData({
          labels,
          datasets: [
            {
              label: "Revenue",
              data,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        return { message: "Error fetching revenue data:" };
        setLoading(false);
      }
    };
    fetchRevenueData();
  }, []);
  const chartData = useMemo(
    () => ({
      ...revenueData,
    }),
    [revenueData]
  );
  return (
    <div className=" space-y-4">
      <h2>Revenue Generated in Last 12 Months</h2>
      {loading ? (
        <Card className=" h-[400px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-[300px] rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className=" rounded-lg">
              <div className="h-3 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      ) : (
        <Card style={{ height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                  },
                },
                x: {
                  title: {
                    display: true,
                  },
                },
              },
            }}
          />
        </Card>
      )}
    </div>
  );
};
export default RevenueChart;
