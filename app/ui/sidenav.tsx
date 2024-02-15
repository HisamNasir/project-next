import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaFile, FaPeopleGroup } from "react-icons/fa6";
import LoginButton from "./LoginButton";

const SideNav = () => {
  return (
    <div className="h-full p-4">
      <Card className="p-2 h-full flex flex-col justify-between">
        <div className=" flex md:flex-col gap-4">
          <Link
            className="flex items-center gap-4 p-2 px-4  border rounded-xl text-center"
            href={"/"}
          >
            <FaHome />
            Home
          </Link>
          <Link
            className="flex items-center gap-4 p-2 px-4  border rounded-xl text-center"
            href={"/invoice/"}
          >
            <FaFile />
            Invoice
          </Link>
          <Link
            className="flex items-center gap-4 p-2 px-4  border rounded-xl text-center"
            href={"/customer/"}
          >
            <FaPeopleGroup />
            Customer
          </Link>
        </div>
        <div className=" flex md:flex-col gap-4">
          <LoginButton />
        </div>
      </Card>
    </div>
  );
};

export default SideNav;
