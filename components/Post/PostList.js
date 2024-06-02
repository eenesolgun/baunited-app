import { useState, useEffect, useCallback } from 'react';
import { RefreshControl, View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import PostItem from './PostItem';
import { getAllPosts } from '../../services/apiPosts';

function PostList() {
  console.log('post-list rendered');
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);
      const posts = await getAllPosts();
      setPosts(posts);
      setIsLoading(false);
    }

    // FIXME additional renders and loader being seen before transition
    if (isFocused) getPosts();
    else setIsLoading(true);
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const posts = await getAllPosts();
    setPosts(posts);
    setRefreshing(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="medium" color="#07aff7" />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['white']}
              progressBackgroundColor={'#07aff7'}
            />
          }
          data={posts}
          renderItem={({ item }) => <PostItem item={item} />}
          keyExtractor={item => Math.random()}
        />
      )}
    </View>
  );
}

export default PostList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
