"use client";

import { SignOutButton } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronsLeftRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useUser from "@/hooks/useUser";

export default function UserItem() {
  const { userInfo } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role='button'
          className='flex w-full items-center p-3 text-sm hover:bg-primary/5'
        >
          <div className='flex max-w-[150px] items-center gap-x-2'>
            <Avatar className='h-5 w-5'>
              <AvatarImage src='https://i.pinimg.com/originals/31/b2/3b/31b23ba6a051a0abc69c7c65a0a26552.jpg' />
            </Avatar>
            <span className='line-clamp-1 text-start font-medium'>
              {userInfo.firstName} {userInfo.lastName}
            </span>
          </div>
          <ChevronsLeftRight className='ml-2 h-4 w-4 rotate-90 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-60' align='start' forceMount>
        <div className='flex flex-col space-y-4 p-2'>
          <p className='text-xs font-medium leading-none text-muted-foreground'>
            {userInfo?.email}
          </p>
          <div className='flex items-center gap-x-2'>
            <div className='p-1'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://i.pinimg.com/originals/31/b2/3b/31b23ba6a051a0abc69c7c65a0a26552.jpg' />
              </Avatar>
            </div>
            <div className='space-y-1'>
              <p className='line-clamp-1 text-sm'>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className='w-full cursor-pointer text-muted-foreground'
        >
          <SignOutButton>Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
