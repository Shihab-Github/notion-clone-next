import { LucideIcon } from "lucide-react";

export interface Document {
    _id: string;
    isArchived: Boolean;
    parentDocumentId: string | null;
    published: Boolean;
    title: string;
    userId:string;
    icon?: LucideIcon
}

export interface CreateDocument {
    title: string;
    parentDocumentId: string | null;
}