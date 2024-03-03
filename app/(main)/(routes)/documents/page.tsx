"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export default function DocumentsPage() {
  const { isSignedIn, user, isLoaded } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" });

    toast.promise(promise, {
      loading: "Creating a new note",
      success: "Successfully created a new note",
      error: "Failed to create a note",
    });
  };

  return (
    <div className='flex h-full flex-col items-center justify-center'>
      <Image
        src='/empty.png'
        width='300'
        height='300'
        className='dark:hidden'
        alt='empty'
      />
      <Image
        src='/empty-dark.png'
        width='300'
        height='300'
        className='hidden dark:block'
        alt='empty'
      />

      {isLoaded && (
        <h2 className='mb-2 text-lg font-medium'>
          Welcome to {user?.firstName}&apos;s Jotion
        </h2>
      )}
      <Button onClick={onCreate}>
        <PlusCircle className='mr-2 h-4 w-4' />
        Create a note
      </Button>
    </div>
  );
}
