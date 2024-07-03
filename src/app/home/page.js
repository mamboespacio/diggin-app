import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { MusicFeed } from "@/components/music/MusicFeed";

export default async function HomePage({
  params,
}) {
  return(
    <main className="my-16">
      <MusicFeed></MusicFeed>
    </main>
  );
}