import { getAlbums } from "@/data/loaders";
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
  const data = await getAlbums();
  if (data?.error?.status === 404) return notFound();
  return(
    <main className="mt-20 mb-36">
      <MusicFeed initialData={data} />
    </main>
  );
}