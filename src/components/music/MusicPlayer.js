"use client"

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react';
// import ReactPlayer from 'react-player';
import ReactPlayerCircleControls from "@/components/music/MusicPlayerCircleControls"
import "@/app/styles.css";
import { usePlayerContext } from '@/context/PlayerContext';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export const MusicPlayer = (trackUrl) => {
  // console.log(trackUrl);
  // const { playerState, setPlayerState } = usePlayerContext();
  // console.log(playerState);
  const player = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [playerState, setPlayerState] = useState({
    played: 0,
    loaded: 0
  });

  const onSeek = amount => {
    if (player.current) {
      player.current.seekTo(amount, 'fraction');
    }
  };

  return (
    <>
      <ReactPlayer
        ref={player}
        url="https://soundcloud.com/satyarecs/yokoo-i-want-more-of-you"
        playing={playing}
        volume={1}
        muted={true}
        height="0"
        width="0"
        onProgress={setPlayerState}
        onEnded={() => setPlaying(false)}
      />
      <ReactPlayerCircleControls
        played={playerState.played}
        loaded={playerState.loaded}
        playing={playing}
        onSeek={onSeek}
        onTogglePlaying={() => setPlaying(!playing)}
      />
    </>
  );
};