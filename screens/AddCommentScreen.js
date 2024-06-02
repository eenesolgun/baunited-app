import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { Pressable, View, Text, TextInput, StyleSheet } from 'react-native';

import { createComment } from '../services/apiComments';

function AddCommentScreen({ navigation, route }) {
  const [comment, setComment] = useState('');
  const commentRef = useRef(comment); // Create a ref for the comment
  const { title, id } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => postComment()} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleComment = useCallback(text => {
    setComment(text);
    commentRef.current = text; // Update the ref whenever the comment changes
  }, []);

  const postComment = useCallback(async () => {
    console.log('comment', commentRef.current); // Use the ref to get the latest value
    const response = await createComment(id, commentRef.current);
    if (response?.status === 'success') navigation.goBack();
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.postTitleContainer}>
        <Text style={styles.postTitle}>{title}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Your comment or emoji reaction"
        value={comment}
        onChangeText={handleComment}
        textAlignVertical="top"
        multiline={true}
      ></TextInput>
    </View>
  );
}

export default AddCommentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    marginRight: 10,
  },
  buttonText: {
    fontFamily: 'plusjakartasans-bold',
    fontSize: 16,
    color: '#07aff7',
  },
  postTitleContainer: {
    paddingHorizontal: 10,
  },
  postTitle: {
    fontFamily: 'plusjakartasans-regular',
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e4',
  },
  input: {
    flex: 1,
    padding: 10,
  },
});
