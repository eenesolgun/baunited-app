import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import PostButton from '../Post/PostButton';
import { voteComment } from '../../services/apiComments';

function CommentFooter({ id, rating }) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  async function handleUpvote() {
    if (isUpvoted) {
      setIsUpvoted(false);
      await voteComment(id, -1);
    } else {
      if (isDownvoted) {
        setIsDownvoted(false);
        setIsUpvoted(true);
        await voteComment(id, 2);
      } else {
        setIsUpvoted(true);
        await voteComment(id, 1);
      }
    }
  }

  async function handleDownvote() {
    if (isDownvoted) {
      setIsDownvoted(false);
      await voteComment(id, 1);
    } else {
      if (isUpvoted) {
        setIsUpvoted(false);
        setIsDownvoted(true);
        await voteComment(id, -2);
      } else {
        setIsDownvoted(true);
        await voteComment(id, -1);
      }
    }
  }

  let userRating = rating;

  if (isUpvoted) userRating++;
  else if (isDownvoted) userRating--;

  return (
    <View style={styles.container}>
      <View style={styles.replyContainer}>
        <Feather name="corner-up-left" size={20} color="black" />
        <Text>Reply</Text>
      </View>
      <View style={styles.ratingsContainer}>
        <PostButton onPress={handleUpvote}>
          <Feather name="thumbs-up" size={18} color="black" style={styles.upvote} />
        </PostButton>
        <Text>{userRating}</Text>
        <PostButton onPress={handleDownvote}>
          <Feather name="thumbs-down" size={20} color="black" />
        </PostButton>
      </View>
    </View>
  );
}

export default CommentFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 40,
  },
  replyContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    gap: 6,
  },
});
