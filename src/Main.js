import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { userLoggedIn } from './actions/index';

import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import NewUpdateScreen from './screens/NewUpdate';

const URL = 'http://127.0.0.1:3000';
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
        props.userLoggedIn(response.data);
        // todo run the function one time upon login (maybe using useEffect)
      } catch (e) {
        console.log(e.message);
      }

      return true;
    }
    return false;
  };

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
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
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

export default connect(mapStateToProps, { userLoggedIn })(Main);
