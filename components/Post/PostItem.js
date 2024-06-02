import { Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostFooter from './PostFooter';

function PostItem({ item }) {
  const navigation = useNavigation();

  const avatars = [
    'https://api.dicebear.com/7.x/bottts/png',
    'https://robohash.org/stefan-one',
    'https://robohash.org/stefan-two',
  ];

  const randomUri = avatars[Math.floor(Math.random() * 3)];

  function handleNavigate() {
    navigation.navigate('PostDetailsScreen', { id: item._id });
  }

  return (
    <Pressable onPress={handleNavigate} style={styles.pressable}>
      <PostHeader username={item.user.username} createdAt={item.createdAt} imageUri={randomUri} />
      <PostContent title={item.title} description={item.description} truncate={3} />
      <PostFooter id={item._id} rating={item.rating} commentCount={item.commentCount} />
    </Pressable>
  );
}

export default PostItem;

const styles = StyleSheet.create({
  pressable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
