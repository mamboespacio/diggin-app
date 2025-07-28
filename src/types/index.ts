export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  artwork: string;
  url: string;
  price: number;
  genre: string;
  releaseDate: string;
  description?: string;
  isPurchased?: boolean;
  isLiked?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  verified: boolean;
  bio?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artwork: string;
  releaseDate: string;
  tracks: Track[];
  price: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  artwork: string;
  tracks: Track[];
  owner: string;
  isPublic: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  followers: number;
  following: number;
  purchasedTracks: string[];
  likedTracks: string[];
  playlists: string[];
}

export interface Post {
  id: string;
  user: Artist;
  track: Track;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  user: Artist;
  text: string;
  timestamp: string;
  likes: number;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  queue: Track[];
  currentIndex: number;
  repeatMode: 'off' | 'track' | 'queue';
  shuffleMode: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  Player: { track?: Track };
  Purchase: { track: Track };
};

export type TabParamList = {
  Home: undefined;
  Discover: undefined;
  Library: undefined;
  Profile: undefined;
};