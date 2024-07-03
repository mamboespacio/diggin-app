
import { CircleUser, LayoutDashboard, Library, MessageSquare, Plus, Search, User } from "lucide-react";
import Link from "next/link";

export const BottomNav = () => {
  return (
    <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-black border-t border-neutral-800">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        <Link href="/home" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Library className="size-5"/>
        </Link>
        <Link href="/discover" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Search className="size-5"/>
        </Link>
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Plus className="size-5"/>
        </Link>
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <MessageSquare className="size-5"/>
        </Link>
        <Link href="/" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <User className="size-5"/>
        </Link>
      </div>
    </div>
  )
}

