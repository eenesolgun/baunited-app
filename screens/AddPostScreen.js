import { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { View, Pressable, Text, TextInput, StyleSheet } from 'react-native';

import { createPost } from '../services/apiPosts';

function AddPostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleRef = useRef(title);
  const descriptionRef = useRef(description);

  const handleSendPost = useCallback(async () => {
    const response = await createPost(titleRef.current, descriptionRef.current);
    if (response?.status === 'success') navigation.goBack();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleSendPost} style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  const handleTitle = useCallback(text => {
    setTitle(text);
    titleRef.current = text;
  }, []);

  const handleDescription = useCallback(text => {
    setDescription(text);
    descriptionRef.current = text;
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Title"
        placeholderTextColor="#5d6b76"
        value={title}
        onChangeText={handleTitle}
      />
      <TextInput
        style={styles.descriptionInput}
        placeholder="body text"
        placeholderTextColor="#5d6b76"
        value={description}
        onChangeText={handleDescription}
        textAlignVertical="top"
        multiline={true}
      />
    </View>
  );
}

export default AddPostScreen;

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
    includeFontPadding: false,
  },
  postTitleContainer: {
    paddingHorizontal: 10,
  },
  titleInput: {
    fontFamily: 'plusjakartasans-bold',
    fontSize: 28,
    padding: 10,
    height: 60,
  },
  descriptionInput: {
    fontFamily: 'plusjakartasans-medium',
    flex: 1,
    padding: 10,
  },
});
