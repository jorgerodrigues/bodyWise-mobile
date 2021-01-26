import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import Logo from '../components/Logo';
import axios from 'axios';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { connect } from 'react-redux';

import { userLoggedIn, errorMessageCreated } from '../actions';
import PrimaryButton from '../components/PrimaryButton';
import WaveBottom from '../components/WaveBottom';
import ClickableLink from '../components/ClicableLink';
import ErrorMessage from '../components/ErrorMessage';

const LoginScreen = (props) => {
  const [user, setUser] = useState();
  const [usersPassword, setPassword] = useState();
  const [errorMessage = null, setErrorMessage] = useState();

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

  const userLogin = async (user, password) => {
    const URL = 'http://127.0.0.1:3000';
    try {
      const response = await axios.post(`${URL}/users/login`, {
        email: user,
        password: password,
      });
      const stringResponse = JSON.stringify(response.data);
      await props.userLoggedIn(JSON.parse(stringResponse));
      console.log(props.isUserLoggedIn);
    } catch (e) {
      props.errorMessageCreated('Login failed');
      setErrorMessage(props.errorOrSuccessMessage.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 68}>
      <Logo />
      {errorMessage === null ? <></> : <ErrorMessage message={errorMessage} />}
      <View style={styles.loginArea}>
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
        <PrimaryButton
          title={'Login'}
          callback={() => userLogin(user, usersPassword)}
        />
      </View>
      <ClickableLink
        text={'Create an account'}
        callback={() => {
          props.navigation.navigate('Signup');
        }}
      />
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
    marginTop: 40,
    justifyContent: 'flex-end',
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps, { userLoggedIn, errorMessageCreated })(
  LoginScreen
);
