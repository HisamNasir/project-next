"use client";
import React from "react";
import { Input, Button } from "@nextui-org/react";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm }) => {
  return (
    <div className="flex gap-1 m-2">
      <Input
        size="sm"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
