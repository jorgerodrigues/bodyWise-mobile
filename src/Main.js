import React, { useEffect } from 'react';
import { StyleSheet, Button, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {
  useFonts,
  Oxygen_400Regular,
  Oxygen_700Bold,
  Oxygen_300Light,
} from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';

import {
  userLoggedIn,
  userSignedOut,
  errorMessageCreated,
} from './actions/index';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import NewUpdateScreen from './screens/NewUpdate';
import UserProfile from './screens/UserProfile';
import { URL } from './config/environment';
import { loggingOut } from './Modules/firebaseFunctions';

const Stack = createStackNavigator();

const Main = (props) => {
  const isUserLoggedIn = async () => {
    const secureToken = await SecureStore.getItemAsync('token');
    if (secureToken) {
      try {
        const response = await axios.get(`${URL}/me`, {
          headers: {
            Authorization: `Bearer ${secureToken}`,
          },
        });
        props.userLoggedIn({ ...response.data, token: secureToken });
      } catch (e) {
        console.log(e.message);
      }

      return true;
    }
    props.userSignedOut();
    return false;
  };

  const signOut = async () => {
    try {
      await axios.post(
        `${URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${props.isUserLoggedIn.token}`,
          },
        }
      );
      await loggingOut();
      props.userSignedOut();
      await SecureStore.deleteItemAsync('token');
      props.errorMessageCreated(null);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const [loadedFont] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
    Oxygen_300Light,
    Nobile_700Bold,
  });

  if (!loadedFont) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.isUserLoggedIn.isLogged ? (
          <>
            <Stack.Screen
              name='NewUpdate'
              component={NewUpdateScreen}
              options={{
                title: '',
                headerTintColor: '#F8FAFC',
                headerTransparent: true,
              }}
              listeners={{
                transitionStart: () => {
                  props.errorMessageCreated(null);
                },
              }}
            />
            <Stack.Screen
              name='UserProfile'
              component={UserProfile}
              options={{
                title: '',
                headerTransparent: true,
                headerRight: () => (
                  <Button
                    onPress={() => signOut()}
                    title='Logout'
                    color='#786EE2'
                  />
                ),
                headerTintColor: '#786EE2',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen
              name='Signup'
              component={SignupScreen}
              listeners={{
                beforeRemove: () => {
                  props.errorMessageCreated(null);
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#E9F1F7',
    borderWidth: 0,
    borderRadius: 10,
    width: 244,
    height: 44,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  userSignedOut,
  errorMessageCreated,
})(Main);
