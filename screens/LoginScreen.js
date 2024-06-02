import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import LoginContent from '../components/Auth/Login/LoginContent';

function LoginScreen() {
  return (
    <LinearGradient colors={['#3a8caf', '#fff']} style={styles.background}>
      <SafeAreaView style={styles.screenContainer}>
        <Pressable style={styles.pressable} onPress={() => Keyboard.dismiss()}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require('../assets/images/bau-logo.png')} />
          </View>
          <LoginContent />
          <Text style={styles.signUpText}>
            Don't have an account?{'  '}
            <Text style={styles.signUpTextStressed}>Register Now</Text>
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + StatusBar.currentHeight,
  },
  screenContainer: {
    flex: 1,
  },
  pressable: {
    position: 'relative',
    flex: 1,
  },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 56,
    resizeMode: 'contain',
  },
  signUpText: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    fontFamily: 'plusjakartasans-semibold',
    textAlign: 'center',
    color: '#000242',
  },
  signUpTextStressed: {
    fontFamily: 'plusjakartasans-extrabold',
    color: '#3a8caf',
  },
});
