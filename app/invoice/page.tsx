"use client";
import React, { useState } from "react";
import SearchBar from "./lib/SearchBar"; // Assuming you have a separate SearchBar component
import AccountList from "./lib/AccountList"; // Component to display the list of accounts

const Invoice = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1>Invoice Page</h1>

      <SearchBar setSearchTerm={setSearchTerm} />

      <AccountList searchTerm={searchTerm} />
    </div>
  );
};

export default Invoice;
