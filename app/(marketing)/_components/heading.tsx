"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
export const Heading = () => {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  const navigate = () => {
    router.push("/login");
  };

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl'>
        Your Ideas, Documents & Plans. Unified. Welcome to{" "}
        <span className='underline'>Jotion</span>
      </h1>
      <h3 className='text-base font-medium sm:text-xl md:text-2xl'>
        Jotion is the workspace where <br /> better and faster work happens
      </h3>
      {isLoading && (
        <div className='flex w-full items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/documents'>
            Enter Jotion <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <Button onClick={navigate}>
          Get Jotion Free <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      )}
    </div>
  );
};
