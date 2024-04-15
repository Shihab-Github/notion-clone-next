"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, ReactNode, KeyboardEvent } from "react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useSearch } from "@/hooks/use-search";
import { getDocuments } from "@/data-layer/users";

export const SearchCommand = () => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const { isLoading, data: documents } = useQuery({
    queryKey: ["documentsData"],
    queryFn: () => {
      return getDocuments().then((data) => {
        return data;
      });
    },
  });

  const onSelect = (id: string) => {
    router.push("/documents" + id);
    onClose();
  };

  useEffect(() => {
    const down = (ev: any) => {
      if (ev.key === "k" && (ev.metaKey || ev.ctrlKey)) {
        ev.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder='Search documents...' />
      <CommandList>
        <CommandEmpty>No documents found.</CommandEmpty>
        <CommandGroup heading='Documents'>
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              title={document.title}
              value={`${document._id}-${document.title}`}
              onSelect={onSelect}
            >
              {document.icon ? (
                <p className='mr-2 text-[18px]'>{"icon hobe"}</p>
              ) : (
                <File className='mr-2 h-4 w-4' />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
