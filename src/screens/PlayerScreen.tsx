import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Slider,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';

import { RootStackParamList, Track } from '../types';
import { formatTime } from '../utils/helpers';
import { play, pause, skipToNext, skipToPrevious, seekTo } from '../services/audioService';

const { width, height } = Dimensions.get('window');

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

const PlayerScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<PlayerScreenRouteProp>();
  const { track } = route.params || {};
  
  const playbackState = usePlaybackState();
  const progress = useProgress();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(track?.isLiked || false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'queue'>('off');
  const [shuffleMode, setShuffleMode] = useState(false);

  useEffect(() => {
    setIsPlaying(playbackState === State.Playing);
  }, [playbackState]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await pause();
    } else {
      await play();
    }
  };

  const handlePrevious = async () => {
    await skipToPrevious();
  };

  const handleNext = async () => {
    await skipToNext();
  };

  const handleSeek = async (value: number) => {
    await seekTo(value);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleRepeat = () => {
    const modes: Array<'off' | 'track' | 'queue'> = ['off', 'track', 'queue'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  const handleShuffle = () => {
    setShuffleMode(!shuffleMode);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'track':
        return 'repeat';
      case 'queue':
        return 'repeat';
      default:
        return 'repeat';
    }
  };

  if (!track) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No track selected</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <LinearGradient
      colors={['#1a1a1a', '#000000']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-down" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>NOW PLAYING</Text>
            <Text style={styles.headerSubtitle}>from {track.album}</Text>
          </View>
          <TouchableOpacity>
            <Icon name="ellipsis-horizontal" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Album Art */}
        <View style={styles.artworkContainer}>
          <View style={styles.artworkShadow}>
            <Image source={{ uri: track.artwork }} style={styles.artwork} />
          </View>
        </View>

        {/* Track Info */}
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{track.title}</Text>
          <Text style={styles.trackArtist}>{track.artist}</Text>
          <Text style={styles.trackGenre}>{track.genre}</Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            minimumValue={0}
            maximumValue={progress.duration}
            value={progress.position}
            onSlidingComplete={handleSeek}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#333"
            thumbStyle={styles.progressThumb}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
            <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.secondaryControls}>
            <TouchableOpacity onPress={handleShuffle}>
              <Icon
                name="shuffle"
                size={24}
                color={shuffleMode ? "#1DB954" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike}>
              <Icon
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? "#ff3040" : "#666"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRepeat}>
              <Icon
                name={getRepeatIcon()}
                size={24}
                color={repeatMode !== 'off' ? "#1DB954" : "#666"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.primaryControls}>
            <TouchableOpacity onPress={handlePrevious}>
              <Icon name="play-skip-back" size={32} color="#fff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <Icon
                name={isPlaying ? "pause" : "play"}
                size={36}
                color="#000"
              />
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleNext}>
              <Icon name="play-skip-forward" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.bottomAction}>
            <Icon name="share-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomAction}>
            <Icon name="list-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomAction}>
            <Icon name="volume-high-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 11,
    marginTop: 2,
  },
  artworkContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  artworkShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 20,
  },
  artwork: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 40,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  trackArtist: {
    color: '#ccc',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  trackGenre: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  progressThumb: {
    width: 12,
    height: 12,
    backgroundColor: '#1DB954',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  timeText: {
    color: '#666',
    fontSize: 12,
  },
  controlsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
    marginBottom: 30,
  },
  primaryControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
  bottomAction: {
    padding: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    color: '#1DB954',
    fontSize: 16,
  },
});

export default PlayerScreen;