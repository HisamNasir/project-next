import { Button, Card } from "@nextui-org/react";
import React from "react";

const SideNav = () => {
  return (
    <div className="h-full p-4  ">
      <Card className="p-2 h-full">
        <div>
          <Button className=" text-center md:w-full">Hello</Button>
        </div>
      </Card>
    </div>
  );
};

export default SideNav;
