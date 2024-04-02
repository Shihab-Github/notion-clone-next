"use client";

import { cn } from "@/lib/utils";
import useScrollTop from "@/hooks/use-scroll-top";
import { Logo } from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className='flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'>
        {isLoading && <Spinner />}

        {!isAuthenticated && !isLoading && (
          <>
            <Button size='sm' variant='ghost'>
              <Link href='/login'>Log In</Link>
            </Button>

            <Button size='sm'>Get Jotion Free</Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/documents'>Enter Jotion</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
