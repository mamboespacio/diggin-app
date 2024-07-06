"use client"

import Image from "next/image"
import Link from "next/link";
import { useContext, useState } from 'react';
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";

import { Ellipsis, Plus, ShoppingBag, Heart, MessageCircle, Share2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MusicPlayer } from "@/components/music/MusicPlayer";
import { usePlayerContext } from '@/context/PlayerContext';

export const MusicPost = (item) => {
  const album = item.item;
  const tracks = album?.tracks.data;
  const user = album?.users_permissions_user;
  // console.log(album);
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const { playerState, setPlayerState } = usePlayerContext();
  const { ref, inView, entry } = useInView({
    /* Optional options */
    // onChange: console.log('entro un nuevo track'),
    threshold: 0.7,
  });
  
  return (
    <div ref={ref} className="flex flex-col gap-4 pb-4 border-b-1">
      <div className="flex items-center justify-between px-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="aspect-[1/1] overflow-hidden relative size-16 sm:size-32 lg:size-36 rounded-full">
            <Image
              fill
              src="https://placehold.co/600x400/jpg"
              style={{ objectFit: "cover" }}
              alt=""
            />
          </div>
          <div className="font-medium dark:text-white">
            <div>{user.firstName + ' ' + user.lastName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 space-x-1">
              <span><Link href={"/" + user.username}>@{user.username}</Link></span>
              <span>· {formatDistance(Date.now(), album.createdAt)} ago</span>
            </div>
          </div>
        </div>
        <div className="ml-4 h-full flex-col space-y-1 xs:flex">
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Ellipsis className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Follow</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="mr-2 h-4 w-4" />
                  <span>Flag</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-4 gap-4">
        <div>
          <div className="flex items-center justify-between space-x-4">
            <p className="text-sm font-bold">
              {album.title}
            </p>
            <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">EP</span>
          </div>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className=""
          >
            <div className="flex items-start justify-between space-x-4">
              <h4 className="text-sm">
                @peduarte starred 3 repositories
                @peduarte starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-0.5 w-9 h-4 p-0">
                  <Ellipsis className="size-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <p className="text-sm w-11/12">
                DOBAISMO is the debut release from Ema Dobao. The Argentinian producer harnesses frequencies from 80s synth wave to proto-House, along with a passion for Latin percussion that is truly felt throughout this album. His LP marks the 18th release for Lips & Rhythm. DOBAISMO is thick and funky with a strong disco core that takes us through seven amazing cuts ready for the dance floor or your living room. All the music was written and recorded over 2020 from a studio called Nave in the Palermo neighborhood of Buenos Aires. The album packs a punch across all the changing tempos that Dobao delivers with a suave and infectious style that we really love.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <div className={cn("bg-white aspect-[1/1] relative overflow-hidden transition-all duration-300", inView ? 'rounded-lg' : 'rounded-lg')}>
          <Image
            fill
            src="https://placehold.co/600x400/jpg"
            style={{ objectFit: "cover" }}
          />
          { inView ? <MusicPlayer trackUrl={tracks[0].previewLink}/> : null }
        </div>
        <div className="grid grid-flow-col justify-stretch space-x-1">
          <Button size="sm" variant="outline" className="gap-1">
            <Heart className="size-4" />
            411
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <MessageCircle className="size-4" />
            411
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <Share2 className="size-4" />
            411
          </Button>
          <Button size="sm" variant="outline" className="gap-1">
            <ShoppingBag className="size-4" />
            411
          </Button>
        </div>
      </div>
    </div>
  )
}