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

export default async function Home() {


  return (
    <main className="container flex h-max w-full flex-grow flex-col items-center">
      <h1 className="text-5xl font-bold">title</h1>
      <p className="text-xl mt-4">description</p>
    </main>
  );
}