"use client"

import { useState } from 'react';
import { getAlbums } from "@/data/loaders";
import InfiniteScroll from "react-infinite-scroller";
import { MusicPost } from '@/components/music/MusicPost';

export const MusicFeed = (initialData) => {
  const [albums, setAlbums] = useState(initialData.initialData.data);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true)

  const loadMoreAlbums = async () => {
    const next = page + 1
    const albums = await getAlbums(next)
    if (albums.data?.length) {
      setPage(next)
      setAlbums((prev) => [
        ...(prev?.length ? prev : []),
        ...albums.data
      ])
    }
    else{
      setHasMore(false)
    }
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreAlbums}
      hasMore={true}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      { albums?.map((item, index) => (
        <MusicPost key={index} item={item}></MusicPost>
      ))
    }
    </InfiniteScroll>
  )
}