import Image from "next/image"
import { Ellipsis, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MusicFeed = () => {
  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-5.jpg" alt=""/>
            <div className="font-medium dark:text-white">
              <div>Dobao</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">@dobao - 8 min ago</div>
            </div>
          </div>
        </div>
        <div>
        <div className="ml-4 h-full flex-col space-y-1 xs:flex">
          <div className="flex space-x-2">
            <Button variant="" className="rounded-full">Follow</Button>
            <Button variant="outline" size="icon" className="rounded-full"><Mail className="size-4"/></Button>
            <Button variant="outline" size="icon" className="rounded-full"><Ellipsis className="size-4"/></Button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold">
          Titulo del album o canción
        </p>
        <p className="text-sm">
          mini description aca
        </p>
      </div>
      <div className="bg-white aspect-[1/1] relative overflow-hidden rounded-lg">
        <Image
          fill
          src="https://placehold.co/600x400/jpg"
          style={{ objectFit: "cover" }}
        />
      </div>

    </div>
  )
}