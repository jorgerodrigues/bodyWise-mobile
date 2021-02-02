import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import axios from 'axios';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';

import PrimaryButton from '../components/PrimaryButton';
import WaveBottom from '../components/WaveBottom';
import Logo from '../components/Logo';
import ErrorMessage from '../components/ErrorMessage';
import { userLoggedIn, errorMessageCreated } from '../actions';

const SignupScreen = (props) => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [usersPassword, setPassword] = useState();
  const [usersPasswordConfirm, setPasswordConfirm] = useState();

  const userAccountCreation = async (user, password, name) => {
    const URL = 'http://127.0.0.1:3000';

    if (password !== usersPasswordConfirm) {
      return props.errorMessageCreated('The passwords do not match');
    }

    // todo: create the account and store the userinfo and login
    try {
      const response = await axios.post(`${URL}/users/signup`, {
        name: name,
        email: user,
        password: password,
      });
      props.userLoggedIn(response.data);
      props.errorMessageCreated(null);
    } catch (e) {
      console.log(e.message);
      props.errorMessageCreated('The signup has failed');
    }
  };

  const [loadedFont] = useFonts({
    Oxygen_400Regular,
  });

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 68}>
      <Logo />
      {props.errorOrSuccessMessage.message === undefined ? (
        <></>
      ) : (
        <ErrorMessage message={props.errorOrSuccessMessage.message} />
      )}
      <View style={styles.loginArea} onPress={Keyboard.dismiss}>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Your first name</Text>
          <TextInput
            autoCapitalize={'words'}
            autoCompleteType={'name'}
            autoCorrect={false}
            style={styles.textInput}
            onChangeText={(text) => setName(text)}
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
          callback={() => userAccountCreation(user, usersPassword, name)}
        />
      </View>
      <WaveBottom style={styles.waveBottom} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return {
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps, { userLoggedIn, errorMessageCreated })(
  SignupScreen
);
