import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import allReducers from './reducers/index';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import NewUpdateScreen from './screens/NewUpdate';

const Stack = createStackNavigator();
const store = createStore(allReducers);

function Main(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.isUserLoggedIn.isLogged ? (
          <>
            <Stack.Screen name='NewUpdate' component={NewUpdateScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name='Login' component={LoginScreen} />
          </>
        )}

        <Stack.Screen name='Signup' component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Main);
