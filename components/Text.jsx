"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";

const Text = () => {
  const handleClick = (mode) => {
    mode ? toast.success("Test Success") : toast.error("Test Error");
  };
  return (
    <div>
      <Button onClick={() => handleClick(true)}> Test Toast </Button>
    </div>
  );
};

export default Text;
