"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "../ui/button";
import { Info, MapPin, Plus, Ticket } from "lucide-react";
// import Date from "@/components/custom/Date";
import { format } from "date-fns";

export const UserGigs = (data) => {
  const gigs = data.data[0].gigs;
  // console.log(gigs);
  const {
    bio,
  } = data.data[0];
  return (
    <Accordion type="single" collapsible>
      {gigs.map((gig, index) => (
        <AccordionItem key={index} value="item-1">
          <AccordionTrigger className="px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center size-10 border border-neutral-500 rounded-lg">
                <span className="text-sm font-medium leading-none">{format(gig.date, 'd')}</span>
                <span className="text-xs uppercase leading-none">{format(gig.date, 'LLL')}</span>
              </div>
              <div className="font-medium text-left">
                  <div>{gig.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{gig.venue}</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center size-10 border border-neutral-500 rounded-full">
                <MapPin className="size-4"></MapPin>
              </div>
              <div className="font-medium text-left">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{gig.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center justify-center size-10 border border-neutral-500 rounded-full">
                <Info className="size-4"></Info>
              </div>
              <div className="font-medium text-left">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{gig.description}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="text-xs">
                <Ticket className="size-4 mr-2"/>
                Tickets
              </Button>
              <Button variant="outline" className="text-xs">
                <Plus className="size-4 mr-2"/>
                Guestlist
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>  
  )
}
