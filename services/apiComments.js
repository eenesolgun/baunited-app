import axios from "./axios";
import * as SecureStore from "expo-secure-store";

export async function voteComment(commentId, value) {
  try {
    const response = await axios.patch(`/comments/${commentId}`, { value });
  } catch (err) {
    console.log(err);
  }
}

export async function createComment(postId, text) {
  console.log("id:", postId);
  console.log("text:", text);
  try {
    const response = await axios.post(`/comments`, {
      text,
      post: postId,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getComments() {
  try {
    const id = await SecureStore.getItemAsync("userId");

    const response = await axios.get(`/comments/usercomments?user=${id}`);

    return response.data.data.comments;
  } catch (err) {
    console.log(err);
  }
}
