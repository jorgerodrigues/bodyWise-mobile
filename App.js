import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import LoginScreen from './src/screens/Login';
import Logo from './src/components/Logo';
import WaveBottom from './src/components/WaveBottom';
import ClickableLink from './src/components/ClicableLink';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Logo style={styles.logo} />
      <LoginScreen />
      <ClickableLink text={'Create an account'} />
      <WaveBottom style={styles.waveBottom} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#E9F1F7',
    borderWidth: 0,
    borderRadius: 10,
    width: 244,
    height: 44,
  },
  waveBottom: {
    width: 100,
  },
});
