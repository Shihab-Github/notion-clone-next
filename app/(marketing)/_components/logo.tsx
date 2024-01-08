import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className='hidden items-center gap-x-2 md:flex'>
      <Image src='/logo.svg' width='40' height='40' alt='Logo' />
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};
