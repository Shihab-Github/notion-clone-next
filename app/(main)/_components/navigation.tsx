"use client";
import { ElementRef, useRef, useState } from "react";
import { ChevronsLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar relative z-[99999] flex h-full w-60 flex-col overflow-y-auto bg-secondary",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "w-0"
        )}
      >
        <div role='button'>
          <ChevronsLeft
            className={cn(
              "absolute right-3 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300  group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
              isMobile && "opacity-100"
            )}
          />
        </div>
        <div>
          <p>Action Items</p>
        </div>
        <div className='mt-4'>
          <p>Documents</p>
        </div>
        <div className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100' />
      </aside>
    </>
  );
}
