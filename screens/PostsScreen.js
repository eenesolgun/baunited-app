import { useLayoutEffect } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import PostList from '../components/Post/PostList';

function PostsScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={styles.addPostButton}
          onPress={() => navigation.navigate('AddPostScreen')}
        >
          <AntDesign name="plus" size={24} color="#07aff7" />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <PostList />
    </View>
  );
}

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addPostButton: {
    marginRight: 18,
  },
});
