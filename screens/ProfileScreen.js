import { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { getMe } from "../services/apiAuth";
import { getPostsForUser } from "../services/apiPosts";
import { getComments } from "../services/apiComments";
import PostHeader from "../components/Post/PostHeader";
import PostContent from "../components/Post/PostContent";
import PostFooter from "../components/Post/PostFooter";
import CommentItem from "../components/Comment/CommentItem";

import { AntDesign } from "@expo/vector-icons";

function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Posts");
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable style={styles.goBackButton}>
          <AntDesign name="arrowleft" size={24} color="#07aff7" />
        </Pressable>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    async function getMyData() {
      setIsLoading(true);
      const userInfo = await getMe();
      const userPosts = await getPostsForUser();
      const userComments = await getComments();
      setUser(userInfo);
      setPosts(userPosts);
      setComments(userComments);
      setIsLoading(false);
    }

    if (isFocused) getMyData();
    else setIsLoading(true);
  }, [isFocused]);

  function handleNavigate(id) {
    navigation.navigate("PostDetailsScreen", { id });
  }

  const renderPost = ({ item }) => (
    <Pressable
      onPress={() => handleNavigate(item._id)}
      style={styles.postContainer}
    >
      <PostHeader
        username={user.username}
        imageUri={"https://api.dicebear.com/7.x/bottts/png"}
        createdAt={item.createdAt}
      />
      <PostContent
        title={item.title}
        description={item.description}
        truncate={3}
      />
      <PostFooter
        id={item._id}
        rating={item.rating}
        commentCount={item.commentCount}
      />
    </Pressable>
  );

  const renderComment = ({ item }) => {
    return <CommentItem item={item} />;
  };

  const birthDate = new Date(user?.birthDate);
  const formattedBirthDate = birthDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="medium" color="#07aff7" />
      ) : (
        <View>
          <View style={styles.userContainer}>
            <Image
              source={{ uri: "https://api.dicebear.com/7.x/bottts/png" }}
              style={styles.image}
            />
            <Text style={styles.username}>{user.username}</Text>
            <Text>
              u/{user.username} {formattedBirthDate}{" "}
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.tabContainer}>
            <Pressable
              style={[
                styles.tabButton,
                selectedTab === "Posts" && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab("Posts")}
            >
              <Text style={styles.tabButtonText}>Posts</Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                selectedTab === "Comments" && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab("Comments")}
            >
              <Text style={styles.tabButtonText}>Comments</Text>
            </Pressable>
            <Pressable
              style={[
                styles.tabButton,
                selectedTab === "About" && styles.selectedTab,
              ]}
              onPress={() => setSelectedTab("About")}
            >
              <Text style={styles.tabButtonText}>About</Text>
            </Pressable>
          </View>

          {selectedTab === "Posts" && (
            <FlatList
              data={posts}
              renderItem={renderPost}
              keyExtractor={(item) => item._id}
            />
          )}

          {selectedTab === "Comments" && (
            <FlatList
              data={comments}
              renderItem={renderComment}
              keyExtractor={(item) => item._id}
            />
          )}
          {selectedTab === "About" && <Text>A</Text>}
        </View>
      )}
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  username: {
    color: "#07aff7",
    fontFamily: "plusjakartasans-semibold",
    fontSize: 18,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  editButton: {
    borderRadius: 30,
    backgroundColor: "#07aff7",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 20,
    color: "white",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 3,
    borderTopColor: "#ddd",
    borderBottomWidth: 3,
    borderBottomColor: "#ddd",
    marginBottom: 20,
    padding: 10,
  },
  tabButtonText: {
    fontFamily: "plusjakartasans-medium",
    fontSize: 18,
  },
  selectedTab: {
    borderBottomWidth: 5,
    borderBottomColor: "#07aff7",
  },
  postContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "#ebebeb",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    gap: 15,
  },
  goBackButton: {
    marginLeft: 15,
  },
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  commentText: {
    fontSize: 16,
  },
});
