import { useState, useEffect } from 'react';

import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import PostButton from './PostButton';
import { votePost } from '../../services/apiPosts';

function PostFooter({ id, rating, commentCount }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  async function handleUpvote() {
    if (isUpvoted) {
      setIsUpvoted(false);
      await votePost(id, -1);
    } else {
      if (isDownvoted) {
        setIsDownvoted(false);
        setIsUpvoted(true);
        await votePost(id, 2);
      } else {
        setIsUpvoted(true);
        await votePost(id, 1);
      }
    }
  }

  async function handleDownvote() {
    if (isDownvoted) {
      setIsDownvoted(false);
      await votePost(id, 1);
    } else {
      if (isUpvoted) {
        setIsUpvoted(false);
        setIsDownvoted(true);
        await votePost(id, -2);
      } else {
        setIsDownvoted(true);
        await votePost(id, -1);
      }
    }
  }

  let userRating = rating;

  if (isUpvoted) userRating++;
  else if (isDownvoted) userRating--;

  return (
    <View style={styles.footer}>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <View style={styles.ratingContainer}>
          <PostButton onPress={handleUpvote} style={styles.upvoteContainer}>
            <Feather name="thumbs-up" size={20} color="black" style={styles.upvote} />
            <View style={styles.ratingTextContainer}>
              <Text>{userRating}</Text>
            </View>
          </PostButton>
          <PostButton onPress={handleDownvote} style={styles.downvoteContainer}>
            <Feather name="thumbs-down" size={20} color="black" />
          </PostButton>
        </View>

        <PostButton parentStyle={{ borderRadius: 50 }} style={styles.commentContainer}>
          <FontAwesome name="comment-o" size={20} color="black" />
          <Text>{commentCount}</Text>
        </PostButton>
      </View>
      <View style={styles.shareContainer}>
        <Ionicons name="arrow-redo-outline" size={22} color="black" />
      </View>
    </View>
  );
}

export default PostFooter;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 50,
    overflow: 'hidden',
  },
  upvoteContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  downvoteContainer: {
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 10,
  },
  ratingTextContainer: {
    paddingRight: 8,
    borderRightColor: '#ebebeb',
    borderRightWidth: 1,
  },
  upvote: {
    marginRight: 8,
  },
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 50,
  },
  shareContainer: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    borderRadius: 50,
  },
});
