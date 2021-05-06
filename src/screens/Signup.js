import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Button,
  ScrollView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import axios from 'axios';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import { createUserAccount } from '../Modules/firebaseFunctions';

import PrimaryButton from '../components/PrimaryButton';
import Logo from '../components/Logo';
import ErrorMessage from '../components/ErrorMessage';
import { userLoggedIn, errorMessageCreated } from '../actions';
import { URL } from '../config/environment';

const SignupScreen = (props, { navigation }) => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [usersPassword, setPassword] = useState();
  const [usersPasswordConfirm, setPasswordConfirm] = useState();

  const userAccountCreation = async () => {
    if (usersPassword !== usersPasswordConfirm) {
      return props.errorMessageCreated('The passwords do not match');
    }
    try {
      await createUserAccount(user, usersPassword, name);
      props.errorMessageCreated(null);
    } catch (e) {
      console.log(e.message);
      props.errorMessageCreated('The signup has failed');
    }
  };

  useEffect(() => {
    props.errorMessageCreated(null);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior='padding'
      style={styles.container}
      keyboardVerticalOffset={useHeaderHeight() + 68}>
      <ScrollView>
        <Logo />
        {props.errorOrSuccessMessage.message == undefined || '' || null ? (
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
          <Button
            title={'Create Account'}
            onPress={() => {
              userAccountCreation();
            }}
          />
        </View>
      </ScrollView>
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
  waveBottom: {
    position: 'absolute',
    bottom: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps, { userLoggedIn, errorMessageCreated })(SignupScreen);
