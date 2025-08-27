import Image from "next/image";

import { cn } from "@/lib/utils";
export const Logo = ({ className = "" }) => {
  return (
    <Image
      className={cn("max-w-[100px]", className)}
      src={"/assets/lws_logo.svg"}
      alt="logo"
      width={180}
      height={130}
    />
  );
};
