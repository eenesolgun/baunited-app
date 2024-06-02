import axios from "./axios";
import * as SecureStore from "expo-secure-store";

export async function login(loginCredentials) {
  try {
    const response = await axios.post("/users/login", {
      email: loginCredentials.email,
      password: loginCredentials.password,
    });

    // Extract token from response
    const token = response.data.token;
    const id = response.data.data.user._id;
    console.log("authid", id);

    // Store token in Expo SecureStore
    await SecureStore.setItemAsync("accessToken", token);
    await SecureStore.setItemAsync("userId", id);

    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getMe() {
  try {
    const response = await axios.get("/users/me");

    return response.data.data.data;
  } catch (err) {
    console.log(err);
  }
}
