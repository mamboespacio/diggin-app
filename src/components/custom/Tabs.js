"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'

export const Tabs = (tabs) => {
  const pathname = usePathname()
  return(
    <div className="grid grid-flow grid-flow-col gap-0 justify-stretch items-center text-sm text-center text-muted-foreground w-full rounded-none border-b">
      {tabs.tabs.map((tab) => (
        <Link
          className={`py-4 border-b-2 border-transparent hover:border-white active:border-white hover:text-white active:text-white ${pathname === pathname + tab.href ? 'active' : ''}`}
          href={`${pathname + tab.href}`}>
          {tab.name}
        </Link>
      ))}
    </div>
  )
}