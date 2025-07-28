import TrackPlayer, {
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { Track } from '../types';

export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10, // 10 MB
    });
    
    await TrackPlayer.updateOptions({
      stopWithApp: false,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
        TrackPlayer.CAPABILITY_SEEK_TO,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  } catch (error) {
    console.log('Error setting up player:', error);
  }
};

export const addTrack = async (track: Track) => {
  await TrackPlayer.add({
    id: track.id,
    url: track.url,
    title: track.title,
    artist: track.artist,
    artwork: track.artwork,
    duration: track.duration,
  });
};

export const addTracks = async (tracks: Track[]) => {
  const trackPlayerTracks = tracks.map(track => ({
    id: track.id,
    url: track.url,
    title: track.title,
    artist: track.artist,
    artwork: track.artwork,
    duration: track.duration,
  }));
  
  await TrackPlayer.add(trackPlayerTracks);
};

export const playTrack = async (track: Track) => {
  try {
    await TrackPlayer.reset();
    await addTrack(track);
    await TrackPlayer.play();
  } catch (error) {
    console.log('Error playing track:', error);
  }
};

export const playTracks = async (tracks: Track[], startIndex: number = 0) => {
  try {
    await TrackPlayer.reset();
    await addTracks(tracks);
    await TrackPlayer.skip(startIndex);
    await TrackPlayer.play();
  } catch (error) {
    console.log('Error playing tracks:', error);
  }
};

export const play = async () => {
  await TrackPlayer.play();
};

export const pause = async () => {
  await TrackPlayer.pause();
};

export const stop = async () => {
  await TrackPlayer.stop();
};

export const skipToNext = async () => {
  await TrackPlayer.skipToNext();
};

export const skipToPrevious = async () => {
  await TrackPlayer.skipToPrevious();
};

export const seekTo = async (position: number) => {
  await TrackPlayer.seekTo(position);
};

export const setRepeatMode = async (mode: RepeatMode) => {
  await TrackPlayer.setRepeatMode(mode);
};

export const getPlaybackState = () => {
  return usePlaybackState();
};

export const getProgress = () => {
  return useProgress();
};

export const usePlayerEvents = (events: Event[], handler: (event: any) => void) => {
  return useTrackPlayerEvents(events, handler);
};

// Sample tracks data for demo
export const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    album: 'Nocturnal Vibes',
    duration: 240,
    artwork: 'https://picsum.photos/300/300?random=1',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    price: 1.99,
    genre: 'Electronic',
    releaseDate: '2024-01-15',
    description: 'A dreamy electronic track perfect for late-night listening.',
    isPurchased: false,
    isLiked: false,
  },
  {
    id: '2',
    title: 'Summer Breeze',
    artist: 'Ocean Waves',
    album: 'Coastal Memories',
    duration: 195,
    artwork: 'https://picsum.photos/300/300?random=2',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    price: 2.49,
    genre: 'Chill',
    releaseDate: '2024-02-20',
    description: 'Relaxing summer vibes with ocean sounds.',
    isPurchased: true,
    isLiked: true,
  },
  {
    id: '3',
    title: 'Urban Rhythm',
    artist: 'City Beats',
    album: 'Street Symphony',
    duration: 210,
    artwork: 'https://picsum.photos/300/300?random=3',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    price: 1.79,
    genre: 'Hip-Hop',
    releaseDate: '2024-03-10',
    description: 'High-energy urban beats that get you moving.',
    isPurchased: false,
    isLiked: true,
  },
  {
    id: '4',
    title: 'Acoustic Soul',
    artist: 'Harmony String',
    album: 'Unplugged Sessions',
    duration: 275,
    artwork: 'https://picsum.photos/300/300?random=4',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    price: 2.99,
    genre: 'Acoustic',
    releaseDate: '2024-01-28',
    description: 'Soulful acoustic guitar with heartfelt lyrics.',
    isPurchased: true,
    isLiked: false,
  },
  {
    id: '5',
    title: 'Digital Horizon',
    artist: 'Cyber Pulse',
    album: 'Future Sounds',
    duration: 320,
    artwork: 'https://picsum.photos/300/300?random=5',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    price: 3.49,
    genre: 'Synthwave',
    releaseDate: '2024-02-14',
    description: 'Futuristic synthwave journey through digital landscapes.',
    isPurchased: false,
    isLiked: false,
  },
];