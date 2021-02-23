import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import Logo from '../components/Logo';
import axios from 'axios';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { firebaseSignIn } from '../Modules/firebaseFunctions';
import {
  userLoggedIn,
  errorMessageCreated,
  shouldStartLoading,
  shouldStopLoading,
} from '../actions';
import PrimaryButton from '../components/PrimaryButton';
import ClickableLink from '../components/ClicableLink';
import ErrorMessage from '../components/ErrorMessage';
import { URL } from '../config/environment';

const LoginScreen = (props) => {
  const [user, setUser] = useState();
  const [usersPassword, setPassword] = useState();

  const userLogin = async () => {
    props.shouldStartLoading();
    try {
      const firebaseResponse = await firebaseSignIn(user, usersPassword);
      const response = await axios.post(`${URL}/users/login`, {
        email: firebaseResponse.user.email,
      });
      props.userLoggedIn(response.data);
      await SecureStore.setItemAsync('token', response.data.token);
      props.errorMessageCreated(null);
    } catch (e) {
      props.shouldStopLoading();
      props.errorMessageCreated('Login failed');
      // add action ot move the loading status to false
    }
  };

  useEffect(() => {
    props.errorMessageCreated(null);
  }, []);

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
      keyboardVerticalOffset={useHeaderHeight() + 150}>
      <Logo />
      {props.errorOrSuccessMessage.message == undefined || '' ? (
        <></>
      ) : (
        <ErrorMessage message={props.errorOrSuccessMessage.message} />
      )}
      <View style={styles.loginArea}>
        <View style={styles.textFieldAndLabel}>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            keyboardType={'email-address'}
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
        {props.isLoading ? (
          <ActivityIndicator />
        ) : (
          <PrimaryButton
            title={'Login'}
            callback={() => userLogin(user, usersPassword)}
          />
        )}
      </View>
      <ClickableLink
        text={'Create an account'}
        callback={() => {
          props.navigation.navigate('Signup');
        }}
      />
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
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  errorMessageCreated,
  shouldStartLoading,
  shouldStopLoading,
})(LoginScreen);
