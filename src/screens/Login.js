import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton'
import ClickableLink from '../components/ClicableLink'
import {
    useFonts,
    Oxygen_400Regular,
  } from '@expo-google-fonts/oxygen'

const LoginScreen = () => {

    useFonts({
        Oxygen_400Regular,
      });


  return (
    <View style={styles.loginArea}>
        <View style={styles.textFieldAndLabel}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput style={styles.textInput} />
        </View>
        <View style={styles.textFieldAndLabel}>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput secureTextEntry={true} style={styles.textInput} />
        </View>
            <PrimaryButton />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#E9F1F7',
    borderWidth: 0,
    borderRadius: 10,
    width: 244,
    height: 44,
    fontFamily: 'Oxygen_400Regular',
    fontSize: 14,
    color: '#2D2E2F',
  },

  textLabel: {
      flexDirection: 'row',
      fontFamily: 'Oxygen_400Regular',
      color: '#2D2E2F',
      fontSize: 15,
      marginBottom: 5
  },
  createAccountText: {
      flexDirection: 'row',
      fontFamily: 'Oxygen_400Regular',
      color: '#2D2E2F',
      marginHorizontal: 15,
      fontSize: 12

  },
  textFieldAndLabel: {
      margin: 15
  },
  loginArea: {
      marginTop: 40
  },
})

export default LoginScreen;
