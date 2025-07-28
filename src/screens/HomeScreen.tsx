import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';
import { Post, Track, RootStackParamList } from '../types';
import { sampleTracks } from '../services/audioService';
import { generateId } from '../utils/helpers';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

// Sample posts data
const samplePosts: Post[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Luna Eclipse',
      avatar: 'https://picsum.photos/100/100?random=10',
      followers: 12500,
      verified: true,
    },
    track: sampleTracks[0],
    caption: 'Late night vibes 🌙 Perfect for your midnight playlist ✨ #electronic #chillvibes',
    likes: 1250,
    comments: [
      {
        id: '1',
        user: {
          id: '2',
          name: 'MusicLover',
          avatar: 'https://picsum.photos/100/100?random=11',
          followers: 500,
          verified: false,
        },
        text: 'This is amazing! 🔥',
        timestamp: '2024-01-20T10:30:00Z',
        likes: 15,
      },
    ],
    timestamp: '2024-01-20T08:00:00Z',
    isLiked: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Ocean Waves',
      avatar: 'https://picsum.photos/100/100?random=12',
      followers: 8900,
      verified: true,
    },
    track: sampleTracks[1],
    caption: 'Summer memories captured in sound 🌊 Close your eyes and feel the breeze',
    likes: 892,
    comments: [],
    timestamp: '2024-01-19T15:45:00Z',
    isLiked: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'City Beats',
      avatar: 'https://picsum.photos/100/100?random=13',
      followers: 15600,
      verified: false,
    },
    track: sampleTracks[2],
    caption: 'Street symphony in full effect 🏙️ When the city becomes your instrument #hiphop #urban',
    likes: 2100,
    comments: [
      {
        id: '2',
        user: {
          id: '4',
          name: 'BeatHead',
          avatar: 'https://picsum.photos/100/100?random=14',
          followers: 200,
          verified: false,
        },
        text: 'This beat hits different! 💯',
        timestamp: '2024-01-19T12:20:00Z',
        likes: 8,
      },
      {
        id: '3',
        user: {
          id: '5',
          name: 'UrbanVibes',
          avatar: 'https://picsum.photos/100/100?random=15',
          followers: 1200,
          verified: false,
        },
        text: 'Need this on repeat! 🔁',
        timestamp: '2024-01-19T13:10:00Z',
        likes: 12,
      },
    ],
    timestamp: '2024-01-19T11:00:00Z',
    isLiked: false,
  },
];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [refreshing, setRefreshing] = useState(false);

  const handlePlayPress = (track: Track) => {
    navigation.navigate('Player', { track });
  };

  const handlePurchasePress = (track: Track) => {
    navigation.navigate('Purchase', { track });
  };

  const handleLikePress = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked }
          : post
      )
    );
  };

  const handleCommentPress = (postId: string) => {
    // TODO: Navigate to comments screen
    console.log('Comment pressed for post:', postId);
  };

  const handleUserPress = (userId: string) => {
    // TODO: Navigate to user profile
    console.log('User pressed:', userId);
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onPlayPress={handlePlayPress}
      onPurchasePress={handlePurchasePress}
      onLikePress={handleLikePress}
      onCommentPress={handleCommentPress}
      onUserPress={handleUserPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>MusicGram</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="heart-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="chatbubble-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Feed */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#1DB954"
            colors={['#1DB954']}
          />
        }
        style={styles.feed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333',
  },
  logo: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
  },
  feed: {
    flex: 1,
  },
});

export default HomeScreen;