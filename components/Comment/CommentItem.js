import { View, Text, StyleSheet } from 'react-native';

import CommentHeader from './CommentHeader';
import CommentFooter from './CommentFooter';

function CommentItem({ item }) {
  const avatars = [
    'https://api.dicebear.com/7.x/bottts/png',
    'https://robohash.org/stefan-one',
    'https://robohash.org/stefan-two',
  ];

  const randomUri = avatars[Math.floor(Math.random() * 3)];

  return (
    <View style={styles.container}>
      <CommentHeader
        username={item.user.username}
        createdAt={item.createdAt}
        imageUri={randomUri}
      />
      <Text style={styles.text}>{item.text}</Text>
      <CommentFooter id={item._id} rating={item.rating} />
    </View>
  );
}

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: 'plusjakartasans-regular',
    marginBottom: 8,
  },
});
