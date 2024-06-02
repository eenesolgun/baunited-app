import { useState, useRef, useCallback, useMemo } from 'react';
import { View, Pressable, TextInput, Animated, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';

function AuthInput({ label, style, value, onChangeText }) {
  // NOTE useRef to create a persistent Animated.Value
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(label === 'Password' ? false : true);
  const placeholderAnim = useRef(new Animated.Value(0)).current;
  const fontSizeAnim = useRef(new Animated.Value(14)).current;
  const backgroundAnim = useRef(new Animated.Value(0)).current;

  // REVIEW performance optimization works or not
  const animatePlaceholder = useCallback((offsetY, fontSize) => {
    Animated.parallel([
      Animated.timing(placeholderAnim, {
        toValue: offsetY,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fontSizeAnim, {
        toValue: fontSize,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const animateButton = useCallback(colorValue => {
    Animated.timing(backgroundAnim, {
      toValue: colorValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, []);

  // REVIEW performance improvement
  const backgroundColor = useMemo(
    () =>
      backgroundAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#fff', '#d4d4d4'],
      }),
    []
  );

  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        onFocus={() => {
          animatePlaceholder(-20, 10);
          setIsFocused(true);
        }}
        onBlur={() => {
          !value && animatePlaceholder(0, 14);
          setIsFocused(false);
        }}
        autoCapitalize="none"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      ></TextInput>
      <Animated.View
        style={[styles.labelContainer, { transform: [{ translateY: placeholderAnim }] }]}
        pointerEvents="none"
      >
        <Animated.Text style={[styles.label, { fontSize: fontSizeAnim }]}>{label}</Animated.Text>
      </Animated.View>

      <View style={styles.buttonContainer} pointerEvents="box-none">
        <Animated.View
          style={[styles.animatedButtonContainer, { backgroundColor }]}
          pointerEvents="box-none"
        >
          {label === 'Password' ? (
            <Pressable
              style={styles.button}
              onPress={() => setShowPassword(showPassword => !showPassword)}
              onPressIn={animateButton.bind(this, 1)}
              onPressOut={animateButton.bind(this, 0)}
            >
              <Ionicons name={`eye-${showPassword ? 'off-' : ''}outline`} size={24} color="black" />
            </Pressable>
          ) : (
            value && (
              <Pressable
                style={styles.button}
                onPress={() => {
                  onChangeText('');
                  backgroundAnim.setValue(0);
                  !isFocused && animatePlaceholder(0, 14);
                }}
                onPressIn={animateButton.bind(this, 1)}
                onPressOut={animateButton.bind(this, 0)}
              >
                <AntDesign name="closecircleo" size={20} color="black" />
              </Pressable>
            )
          )}
        </Animated.View>
      </View>
    </View>
  );
}

export default AuthInput;

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative', // REVIEW not needed
  },
  input: {
    height: 56,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    fontFamily: 'plusjakartasans-regular',
    fontSize: 16,
  },
  inputFocused: { borderColor: '#000' },
  labelContainer: {
    ...StyleSheet.absoluteFill,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'plusjakartasans-regular',
    includeFontPadding: false,
    color: 'gray',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    marginRight: 15,
  },
  animatedButtonContainer: {
    borderRadius: 30,
  },
  button: {
    padding: 6,
    borderRadius: 30,
  },
});
