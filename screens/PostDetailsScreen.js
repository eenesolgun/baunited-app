import { useState, useEffect } from "react";
import {
  Pressable,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostFooter from "../components/Post/PostFooter";
import { getPost } from "../services/apiPosts";

import CommentItem from "../components/Comment/CommentItem";

function PostDetailsScreen({ route, navigation }) {
  console.log("post details screen");
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState();
  const isFocused = useIsFocused();

  const receivedData = route.params?.id;

  useEffect(() => {
    async function handleGetPost() {
      setIsLoading(true);
      const response = await getPost(receivedData);
      setPost(response);
      setIsLoading(false);
    }

    if (isFocused) handleGetPost();
    // else setIsLoading(true);
  }, [isFocused]);

  function handlePress() {
    navigation.navigate("AddCommentScreen", {
      title: post.title,
      id: post._id,
    });
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { justifyContent: isLoading ? "center" : "flex-start" },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="medium" color="#07aff7" />
      ) : (
        <>
          <View style={styles.postContainer}>
            <PostHeader
              username={post.user.username}
              createdAt={post.createdAt}
              imageUri="https://robohash.org/stefan-two"
            />
            <PostContent title={post.title} description={post.description} />
            <PostFooter
              id={post._id}
              rating={post.rating}
              commentCount={post.comments.length}
            />
          </View>
          <FlatList
            data={post.comments}
            renderItem={({ item }) => <CommentItem item={item} />}
          />
          <View style={styles.inputContainer}>
            <Pressable onPress={handlePress} style={styles.commentInput}>
              <Text style={styles.placeholder}>Add a comment</Text>
            </Pressable>
            <Pressable style={styles.scrollButtonContainer}>
              <SimpleLineIcons name="arrow-down" size={16} color="black" />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

export default PostDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  postContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ebebeb",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 8,
    elevation: 0.08,
  },
  commentInput: {
    backgroundColor: "#f2f3f5",
    padding: 4,
    borderRadius: 8,
    height: 45,
    flex: 1,
    justifyContent: "center",
  },
  placeholder: {
    marginLeft: 10,
    fontFamily: "plusjakartasans-regular",
    color: "#747373",
  },
  scrollButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f3f5",
    height: 45,
    width: 45,
    borderRadius: 30,
  },
});
