"use client";
import React, { useState } from "react";
import SearchBar from "./lib/SearchBar";
import AccountList from "./lib/AccountList";
const Customer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <h1>Invoice Page</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <AccountList searchTerm={searchTerm} />
    </div>
  );
};

export default Customer;
