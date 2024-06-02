import { useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

function PostButton({ children, onPress, style, parentStyle }) {
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  const animateButton = colorValue => {
    Animated.timing(backgroundAnim, {
      toValue: colorValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = backgroundAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#d4d4d4'],
  });

  return (
    <Animated.View style={[parentStyle, { backgroundColor }]}>
      <Pressable
        style={style}
        onPress={onPress}
        onPressIn={animateButton.bind(this, 1)}
        onPressOut={animateButton.bind(this, 0)}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default PostButton;

const styles = StyleSheet.create({});
