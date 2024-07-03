import { getUserByUserName } from "@/data/loaders";
import { notFound } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { UserCard } from "@/components/user/UserCard";
import { MusicGrid } from "@/components/music/MusicGrid";
import { ProfileAbout } from "@/components/user/ProfileAbout";
import { UserGigs } from "@/components/user/UserGigs";

export default async function Page({
  params,
}) {
  const data = await getUserByUserName(params.userName);
  if (data?.error?.status === 404) return notFound();
  console.log(data);
  return(
    <main className="my-16">
      <UserCard item={data} />
      <Tabs defaultValue="music" className="w-full">
        <TabsList className="h-12 grid w-full grid-cols-3 gap-0.5 p-0 bg-black border-b border-neutral-800">
          <TabsTrigger className="h-12 rounded-none border-b-2 data-[state=active]:bg-black data-[state=active]:border-white" value="music">Music</TabsTrigger>
          <TabsTrigger className="h-12 rounded-none border-b-2 data-[state=active]:bg-black data-[state=active]:border-white" value="about">About</TabsTrigger>
          <TabsTrigger className="h-12 rounded-none border-b-2 data-[state=active]:bg-black data-[state=active]:border-white" value="gigs">Gigs</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0" value="music">
          <MusicGrid/>
        </TabsContent>
        <TabsContent className="mt-0" value="about">
          <ProfileAbout data={data}/>
        </TabsContent>
        <TabsContent className="mt-0" value="gigs">
          <UserGigs data={data}/>
        </TabsContent>
      </Tabs>
    </main>
  );
}