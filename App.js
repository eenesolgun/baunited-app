import { useCallback } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/LoginScreen";
import PostsScreen from "./screens/PostsScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";
import AddCommentScreen from "./screens/AddCommentScreen";
import AddPostScreen from "./screens/AddPostScreen";
import ChatScreen from "./screens/ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";

// NOTE import on login
import SocketManager from "./SocketManager";

// Keep the splash screen visible while we fetch resources
// NOTE this prevents SplashScreen from auto hiding while the fonts are loaded
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function TabsScreen() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          // shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "plusjakartasans-semibold",
          fontSize: 14,
        },
        tabBarActiveTintColor: "#0585fc",
        tabBarInactiveTintColor: "black",
      }}
    >
      <BottomTabs.Screen
        name="BAUnited"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#0585fc",
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          tabBarLabel: "Posts", // Label for the tab
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="newspaper-o" size={size} color={color} />
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={size} color={color} />
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "plusjakartasans-extralight": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraLight.ttf"),
    "plusjakartasans-light": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Light.ttf"),
    "plusjakartasans-regular": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Regular.ttf"),
    "plusjakartasans-medium": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Medium.ttf"),
    "plusjakartasans-semibold": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-SemiBold.ttf"),
    "plusjakartasans-bold": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-Bold.ttf"),
    "plusjakartasans-extrabold": require("./assets/fonts/PlusJakartaSans/PlusJakartaSans-ExtraBold.ttf"),
  });

  // REVIEW useCallback does not have any benefit right now
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) await SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <Stack.Navigator>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="TabsScreen"
              component={TabsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="PostDetailsScreen"
              component={PostDetailsScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddCommentScreen"
              component={AddCommentScreen}
              options={{
                animation: "slide_from_bottom",
                headerTitle: "Add comment",
              }}
            />
            <Stack.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              options={{
                animation: "slide_from_bottom",
                headerTitle: "Add post",
              }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
