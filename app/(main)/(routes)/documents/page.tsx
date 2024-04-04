"use client";

import Image from "next/image";
import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDocument } from "@/data-layer/documents";
import { CreateDocument } from "@/interface/Document";

export default function DocumentsPage() {
  const queryClient = useQueryClient();
  const { userInfo } = useUser();

  const newDocumentMutation = useMutation({
    mutationFn: (data: CreateDocument) => {
      return createDocument(data).then((res) => {
        console.log("data: ", res);
      });
    },
    onSuccess: () => {
      toast.success("Document has been created");
      queryClient.invalidateQueries({ queryKey: ["documentsData"] });
    },
  });

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

      <h2 className='mb-2 text-lg font-medium'>
        Welcome to {userInfo.firstName}&apos;s Jotion
      </h2>

      <Button
        disabled={newDocumentMutation.isPending}
        onClick={() =>
          newDocumentMutation.mutate({
            title: "Untitled",
            parentDocumentId: null,
          })
        }
      >
        <PlusCircle className='mr-2 h-4 w-4' />
        Create a note
      </Button>
    </div>
  );
}
