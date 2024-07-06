"use server"

import qs from "qs";
import { getAuthToken } from "./services/get-token";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

export async function getGlobalData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.authButton",
    ],
  });

  return await fetchData(url.href);
}

async function fetchData(url) {
  const authToken = await getAuthToken();

  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  };

  try {
    const response = await fetch(url, authToken ? headers : {});
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

// export async function getHomePageData() {
  
//   const url = new URL("/api/home-page", baseUrl);

//   url.search = qs.stringify({
//     populate: {
//       blocks: {
//         populate: {
//           image: {
//             fields: ["url", "alternativeText"],
//           },
//           link: {
//             populate: true,
//           },
//           feature: {
//             populate: true,
//           },
//         },
//       },
//     },
//   });

//   return await fetchData(url.href);
// }


// export async function getGlobalPageMetadata() {
//   const url = new URL("/api/global", baseUrl);

//   url.search = qs.stringify({
//     fields: ["title", "description"]
//   })

//   return await fetchData(url.href);
// }


export async function getAlbums(currentPage) {
  const PAGE_SIZE = 2;

  const query = qs.stringify({
    sort: ["createdAt:desc"],
    // filters: {
    //   $or: [
    //     { title: { $containsi: queryString } },
    //     { summary: { $containsi: queryString } },
    //   ],
    // },
    populate: {
      tracks: {
        populate: true,
      },
      users_permissions_user: {
        populate: true,
      }
    },
    pagination: {
      pageSize: PAGE_SIZE,
      page: currentPage,
    },
  });

  // const url = new URL("/api/albums", baseUrl);
  // url.search = query;

  // return fetchData(url.href);
  return fetchData(`${baseUrl}/api/albums?${query}`);
}

export async function getUserByUserName(userName) {
  const query = qs.stringify({
    filters: {
      username: {
        $eq: userName,
      },
    },
    populate: {
      gigs: {
        populate: true,
      },
      // authorsBio: {
      //   populate: ["avatar", "articles"]
      // },
      // seo: {
      //   populate: ["shareImage"]
      // }
    },
  }, {
    encodeValuesOnly: true, // prettify URL
  });
  return fetchData(`${baseUrl}/api/users?${query}`);
}