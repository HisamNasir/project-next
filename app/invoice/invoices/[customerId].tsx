import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/app/utils/firebase";

import { Card } from "@nextui-org/react";

const InvoiceDetails = () => {
  const router = useRouter();
  const { customerId } = router.query;
  const [invoiceDetails, setInvoiceDetails] = useState(null);
  useEffect(() => {
    const fetchInvoiceDetails = async () => {
      try {
        const revenueDataDoc = await getDoc(
          doc(firestore, "RevenueData", "Revenue")
        );
        const invoicesData = revenueDataDoc.data().invoices;
        const invoice = invoicesData.find(
          (invoice) => invoice.customer_id === customerId
        );
        setInvoiceDetails(invoice);
      } catch (error) {
        return { message: "Error fetching invoice details:" };
      }
    };
    if (customerId) {
      fetchInvoiceDetails();
    }
  }, [customerId]);

  if (!invoiceDetails) {
    return <Card>Loading...</Card>;
  }
  return (
    <Card>
      <h1>Invoice Details</h1>
      <p>Customer ID: {invoiceDetails.customer_id}</p>
      <p>Amount: ${invoiceDetails.amount}</p>
      <p>Date: {invoiceDetails.date}</p>
      <p>Status: {invoiceDetails.status}</p>
    </Card>
  );
};

export default InvoiceDetails;
