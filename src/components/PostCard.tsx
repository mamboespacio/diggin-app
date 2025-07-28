import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Post, Track } from '../types';
import { formatNumber, getTimeAgo, formatPrice } from '../utils/helpers';
import { playTrack } from '../services/audioService';

const { width } = Dimensions.get('window');

interface PostCardProps {
  post: Post;
  onPlayPress: (track: Track) => void;
  onPurchasePress: (track: Track) => void;
  onLikePress: (postId: string) => void;
  onCommentPress: (postId: string) => void;
  onUserPress: (userId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onPlayPress,
  onPurchasePress,
  onLikePress,
  onCommentPress,
  onUserPress,
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    onLikePress(post.id);
  };

  const handlePlay = () => {
    onPlayPress(post.track);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.userInfo}
          onPress={() => onUserPress(post.user.id)}
        >
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.userNameContainer}>
              <Text style={styles.username}>{post.user.name}</Text>
              {post.user.verified && (
                <Icon name="checkmark-circle" size={16} color="#1DB954" />
              )}
            </View>
            <Text style={styles.timestamp}>{getTimeAgo(post.timestamp)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Track Image with Play Button */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.track.artwork }} style={styles.trackImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        >
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle}>{post.track.title}</Text>
            <Text style={styles.trackArtist}>{post.track.artist}</Text>
            <Text style={styles.trackGenre}>{post.track.genre}</Text>
          </View>
        </LinearGradient>
        
        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
          <Icon name="play" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Icon
              name={isLiked ? "heart" : "heart-outline"}
              size={28}
              color={isLiked ? "#ff3040" : "#fff"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onCommentPress(post.id)}
            style={styles.actionButton}
          >
            <Icon name="chatbubble-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="paper-plane-outline" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => onPurchasePress(post.track)}
          style={styles.purchaseButton}
        >
          <Text style={styles.purchaseText}>{formatPrice(post.track.price)}</Text>
        </TouchableOpacity>
      </View>

      {/* Likes and Caption */}
      <View style={styles.content}>
        <Text style={styles.likes}>{formatNumber(likesCount)} likes</Text>
        
        <View style={styles.captionContainer}>
          <Text style={styles.caption}>
            <Text style={styles.username}>{post.user.name} </Text>
            {post.caption}
          </Text>
        </View>

        {post.comments.length > 0 && (
          <TouchableOpacity onPress={() => onCommentPress(post.id)}>
            <Text style={styles.viewComments}>
              View all {post.comments.length} comments
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  timestamp: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  trackImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  trackInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  trackTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  trackArtist: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 2,
  },
  trackGenre: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: '500',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -30 }],
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  purchaseButton: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  purchaseText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    paddingHorizontal: 15,
  },
  likes: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 8,
  },
  captionContainer: {
    marginBottom: 8,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 18,
  },
  viewComments: {
    color: '#888',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default PostCard;