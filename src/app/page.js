// async function getStrapiData(url) {
//   const baseUrl = "http://localhost:1337";
//   try {
//     const response = await fetch(baseUrl + url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export default async function Home() {
//   const strapiData = await getStrapiData("/api/home-page");

//   const { title, description } = strapiData.data.attributes;

//   return (
//     <main className="container mx-auto py-6">
//       <h1 className="text-5xl font-bold">{title}</h1>
//       <p className="text-xl mt-4">{description}</p>
//     </main>
//   );
// }

import Link from "next/link";
import { Button } from "@/components/ui/button";
export default async function Home() {


  return (
    <main className="container flex h-max w-full flex-grow flex-col items-center  text-center py-16">
      <h1 className="mt-12 text-5xl font-bold">DIGGIN</h1>
      <p className="text-xl mt-4">Aca una home para los que entran sin haberse loguedo</p>
      <Link className="mt-8" href="/signin">
        <Button>Sign In</Button>
      </Link>
    </main>
  );
}