import { Button, Card } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { FaHome } from "react-icons/fa";
import { FaFile, FaPeopleGroup } from "react-icons/fa6";

const SideNav = () => {
  return (
    <div className="h-full p-4  ">
      <Card className="p-2 h-full">
        <div className=" flex flex-col gap-4">
          <Link href={"/"}>
            <Button color="default" className=" text-center md:w-full">
              <FaHome />
              Home
            </Button>
          </Link>
          <Link href={"/invoice/"}>
            <Button color="default" className=" text-center md:w-full">
              <FaFile />
              Invoice
            </Button>
          </Link>
          <Link href={"/"}>
            <Button color="default" className=" text-center md:w-full">
              <FaPeopleGroup />
              Custommer
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SideNav;
