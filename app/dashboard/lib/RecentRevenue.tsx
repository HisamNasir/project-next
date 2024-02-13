import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";

const RecentRevenue = () => {
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const revenueData = revenueDataDoc.data().revenue;
        const last12MonthsData = revenueData.slice(-12);
        const months = last12MonthsData.map((data) => data.month);
        const revenueValues = last12MonthsData.map((data) => data.revenue);
        setRevenueData({
          labels: months,
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: revenueValues,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <div>
      <h2>Revenue Generated in Last 12 Months</h2>
      <Bar
        data={revenueData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RecentRevenue;
