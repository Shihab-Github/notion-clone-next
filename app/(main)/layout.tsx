"use client";

import { useConvexAuth } from "convex/react";
import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import useAuth from "@/hooks/useAuth";
import { SearchCommand } from "@/components/search-command";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <div className='flex h-full dark:bg-[#1F1F1F]'>
      <Navigation />
      <main className='h-full flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
}
