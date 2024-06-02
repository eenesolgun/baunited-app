import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AuthInput from '../AuthInput';
import Button from '../../UI/Button';
import { login } from '../../../services/apiAuth';

function AuthForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = useCallback(() => {
    navigation.navigate('TabsScreen');
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await login({ email, password });
    if (response && response.data.status === 'success') handleNavigate();
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <AuthInput
        label="Email or Username"
        style={{ marginBottom: 12 }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <AuthInput
        label="Password"
        style={{ marginBottom: 12 }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </View>
      <Button style={styles.loginButton} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </Button>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  forgotPasswordText: {
    fontFamily: 'plusjakartasans-bold',
    color: '#000242',
  },
  loginButton: {},
  buttonText: {
    fontFamily: 'plusjakartasans-bold',
    fontSize: 16,
    color: '#fff',
  },
});
