import { View, Text, Image, StyleSheet } from 'react-native';

import { timeSince } from '../../utils/helpers';

function CommentHeader({ username, createdAt, imageUri }) {
  const createdSince = timeSince(new Date(createdAt));

  return (
    <View style={styles.header}>
      <View style={styles.userAvatarContainer}>
        <Image source={{ uri: imageUri }} style={styles.userAvatar} />
      </View>
      <View style={styles.commentInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.createdAt}>{createdSince}</Text>
      </View>
    </View>
  );
}

export default CommentHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userAvatarContainer: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 30,
    overflow: 'hidden',
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  commentInfo: {
    flexDirection: 'row',
    marginLeft: 6,
  },
  username: {
    fontFamily: 'plusjakartasans-semibold',
  },
  createdAt: {
    fontFamily: 'plusjakartasans-medium',
    color: '#8b8b8b',
    marginLeft: 6,
  },
});
