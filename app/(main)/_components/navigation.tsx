"use client";
import { ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";
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

  useEffect(() => {
    setIsCollapsed((prev) => !prev);
  }, [isMobile]);

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
      <div
        ref={navbarRef}
        className={cn(
          "absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]",
          isResetting && "transition-all duration-300 ease-in-out",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className='w-full bg-transparent px-3 py-2'>
          {isCollapsed && (
            <MenuIcon role='button' className='h-6 w-6 text-muted-foreground' />
          )}
        </nav>
      </div>
    </>
  );
}
