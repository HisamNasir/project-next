import React from "react";
import Layout from "./dashboard/layout";
export default function NotFound() {
  return (
    <Layout>
      <div className=" text-center flex flex-col justify-center h-screen">
        <p className=" text-6xl tracking-widest">Error 404</p>
        <p>Your page is not found</p>
      </div>
    </Layout>
  );
}
