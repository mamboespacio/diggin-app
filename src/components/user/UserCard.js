"use client";

import { cn } from "@/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Ellipsis, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function AvatarDemo() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}


export const UserCard = (item, className) => {
  const {
    firstName,
    lastName,
    username,
    about,
    image
  } = item.item[0];
  return (
    <div className="px-4 py-4 flex h-full w-full flex-col space-y-1 xs:flex-row xs:items-start xs:space-x-4 xs:space-y-1 border-b">
      <div className="flex items-center justify-between">
        <div className="aspect-[1/1] overflow-hidden relative size-16 sm:size-32 lg:size-36 rounded-full">
          <Image
            fill
            src="https://placehold.co/600x400/jpg"
            style={{ objectFit: "cover" }}
            alt=""
          />
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
      </div>
      <div className="flex w-full min-w-0 flex-grow flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-neutral-100">{firstName} {lastName}</h1>
            <div className="text-sm text-neutral-400">@{username}</div>
          </div>
        </div>
      </div>
      <div>
        <p className="whitespace-pre-line break-words text-sm text-neutral-100">
          {about}
        </p>
        <div className="l py-2 text-sm">
          <a className="mr-2.5" href="/creampuffz/following">
            <span className="font-medium text-neutral-200">41</span>
            <span className="text-neutral-500 ml-1">Following</span>
          </a>
          <a href="/creampuffz/followers">
            <span className="font-medium text-neutral-200">58</span>
            <span className="text-neutral-500 ml-1">Followers</span>
          </a>
        </div>
      </div>
    </div>
  );
}