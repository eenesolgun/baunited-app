import { View, Text, StyleSheet } from 'react-native';

import LoginForm from './LoginForm';

function AuthContent() {
  return (
    <>
      <View style={styles.introductionTextContainer}>
        <Text style={styles.introductionText}>Welcome back, BAUlu!</Text>
        <Text style={styles.introductionText}>You're home.</Text>
      </View>
      <LoginForm />
    </>
  );
}

const styles = StyleSheet.create({
  introductionTextContainer: {
    marginBottom: 18,
  },
  introductionText: {
    fontFamily: 'plusjakartasans-bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#000242',
  },
});

export default AuthContent;
