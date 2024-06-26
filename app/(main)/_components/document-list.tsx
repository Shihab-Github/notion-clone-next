"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Doc } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Item from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { getDocuments } from "@/data-layer/users";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: Doc<"documents">[];
}

export default function DocumentList({
  parentDocumentId,
  level = 0,
}: DocumentListProps) {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { isLoading, data: documents } = useQuery({
    queryKey: ["documentsData", parentDocumentId],
    queryFn: () => {
      return getDocuments(parentDocumentId as string).then((data) => {
        return data;
      });
    },
  });

  const onRedirect = (documentId: string) => {
    router.push("/documents/" + documentId);
  };

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
    console.log("expanded: ", expanded);
    queryClient.invalidateQueries({ queryKey: ["documentsData"] });
  };

  if (isLoading) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {documents?.length === 0 && (
        <p
          style={{
            paddingLeft: level ? `${level * 12 + 25}px` : undefined,
          }}
          className={cn(
            "hidden text-sm font-medium text-muted-foreground/80",
            expanded && "last:block",
            level === 0 && "hidden"
          )}
        >
          No Pages Available
        </p>
      )}

      {documents?.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            onClick={() => onRedirect(document._id)}
            icon={FileIcon}
            // documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
}
