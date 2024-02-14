"use client";
import React from "react";
import { Input, Button } from "@nextui-org/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ setSearchTerm }) => {
  const handleSearch = () => {
    // Logic to trigger search
  };

  return (
    <div className="flex gap-1 m-2">
      <Input
        size="small"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <Button onClick={handleSearch}>
        <FaMagnifyingGlass />
      </Button>
    </div>
  );
};

export default SearchBar;
