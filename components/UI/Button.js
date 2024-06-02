import { View, Pressable, Text, StyleSheet } from 'react-native';

function Button({ children, onPress, mode, style }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress} android_ripple={{ color: '#003f5a' }}>
        {children}
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  button: {
    height: 54,
    backgroundColor: '#009fe3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
