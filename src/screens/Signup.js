import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import WaveBottom from '../components/WaveBottom';
import ClickableLink from '../components/ClicableLink';
import Logo from '../components/Logo';
import axios from 'axios';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';

const SignupScreen = () => {
  const [user, setUser] = useState();
  const [usersPassword, setPassword] = useState();
  const [usersPasswordConfirm, setPasswordConfirm] = useState();
  console.log(user);

  const [loadedFont] = useFonts({
    Oxygen_400Regular,
  });

  const userAccountCreation = async (user, password) => {
    const URL = 'http://127.0.0.1:3000';

    // todo: create the account and store the userinfo and login
    try {
      // todo save the response data to local storage so it can be checked next time the app is run
    } catch (e) {
      console.log(e);
    }
  };

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <View style={styles.loginArea}>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Your first name</Text>
          <TextInput
            autoCapitalize={'words'}
            autoCompleteType={'name'}
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setUser(text)}
          />
        </View>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setUser(text)}
          />
        </View>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(text) => setPasswordConfirm(text)}
          />
        </View>
        <PrimaryButton
          title={'Create your account'}
          callback={() => userLogin(user, usersPassword)}
        />
      </View>
      <WaveBottom style={styles.waveBottom} />
    </SafeAreaView>
  );
};

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
    fontFamily: 'Oxygen_400Regular',
    fontSize: 14,
    color: '#2D2E2F',
    paddingHorizontal: 10,
  },

  textLabel: {
    flexDirection: 'row',
    fontFamily: 'Oxygen_400Regular',
    color: '#2D2E2F',
    fontSize: 15,
    marginBottom: 5,
    alignSelf: 'center',
  },
  createAccountText: {
    flexDirection: 'row',
    fontFamily: 'Oxygen_400Regular',
    color: '#2D2E2F',
    marginHorizontal: 15,
    fontSize: 12,
  },
  textFieldAndLabel: {
    margin: 15,
    alignItems: 'center',
  },
  loginArea: {
    marginTop: 0,
  },
});

export default SignupScreen;
