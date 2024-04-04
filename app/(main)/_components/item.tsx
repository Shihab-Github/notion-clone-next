"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  Plus,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";
import { CreateDocument, PatchDocument } from "@/interface/Document";
import { createDocument, archiveDocument } from "@/data-layer/documents";

interface ItemProps {
  id?: string;
  documentIcon?: string;
  active?: Boolean;
  expanded?: Boolean;
  isSearch?: Boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export default function Item({
  id,
  documentIcon,
  isSearch,
  level = 0,
  active,
  expanded,
  onExpand,
  label,
  onClick,
  icon: Icon,
}: ItemProps) {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const router = useRouter();
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const newDocumentMutation = useMutation({
    mutationFn: (data: CreateDocument) => {
      return createDocument(data);
    },
    onSuccess: () => {
      toast.success("Document has been created");
      queryClient.invalidateQueries({ queryKey: ["documentsData"] });
      if (!expanded) {
        onExpand?.();
      }
    },
  });

  const archiveDocumentMutation = useMutation({
    mutationFn: (data: PatchDocument) => {
      return archiveDocument(data);
    },
    onSuccess: () => {
      toast.success("Document has been deleted");
      queryClient.invalidateQueries({ queryKey: ["documentsData"] });
    },
  });

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    newDocumentMutation.mutate({
      title: "Untitled",
      parentDocumentId: id as string,
    });
  };

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;

    archiveDocumentMutation.mutate({
      _id: id,
      isArchived: true,
    });
  };

  return (
    <div
      role='button'
      className={cn(
        "group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5",
        active && "bg-primary/5 text-primary"
      )}
      onClick={onClick}
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
    >
      {!!id && (
        <div
          role='button'
          className='mr-1 h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600'
          onClick={handleExpand}
        >
          <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
        </div>
      )}
      {documentIcon ? (
        <div className='mr-2 shrink-0 text-[18px]'>{documentIcon}</div>
      ) : (
        <Icon className='mr-2 h-[18px] shrink-0 text-muted-foreground' />
      )}

      <span className='truncate'>{label}</span>
      {isSearch && (
        <kbd className='pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
          <span className='text-xs'>CTRL</span>K
        </kbd>
      )}
      {id && (
        <div className='ml-auto flex items-center gap-x-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                role='button'
                className='ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:bg-neutral-600 '
              >
                <MoreHorizontal className='h-4 w-4 text-muted-foreground' />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-60'
              align='start'
              side='right'
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className='mr-2 h-4 w-4' />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className='p-2 text-xs text-muted-foreground'>
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            role='button'
            onClick={onCreate}
            className='ml-auto h-full rounded-sm opacity-0 hover:bg-neutral-300 group-hover:opacity-100 dark:hover:bg-neutral-600'
          >
            <Plus className='h-4 w-4 text-muted-foreground' />
          </div>
        </div>
      )}
    </div>
  );
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{
        paddingLeft: level ? `${level * 12 + 25}px` : `12px`,
      }}
      className='flex gap-x-2 py-[3px]'
    >
      <Skeleton className='h-4 w-4 ' />
      <Skeleton className='h-4 w-[30%] ' />
    </div>
  );
};
