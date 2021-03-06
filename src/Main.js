import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  userLoggedIn,
  userSignedOut,
  errorMessageCreated,
  shouldStartLoading,
  shouldStopLoading,
} from './actions/index';
import LoginScreen from './screens/Login';
import SignupScreen from './screens/Signup';
import NewUpdateScreen from './screens/NewUpdate';
import UserProfile from './screens/UserProfile';
import FoodTracking from './screens/FoodTracking';
import FoodDetails from './screens/FoodDetails';
import { isUserLoggedIn, loggingOut } from './Modules/loginFunctions';

const Stack = createStackNavigator();

const Main = (props) => {
  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const navigateToPage = (pageName) => {
    const navigation = useNavigation();
    navigation.navigate(pageName);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.isLoggedIn.isLogged ? (
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
              name='FoodTracking'
              component={FoodTracking}
              options={{
                title: '',
                headerTintColor: '#F8FAFC',
                headerTransparent: true,
              }}
            />
            <Stack.Screen
              name='UserProfile'
              component={UserProfile}
              options={{
                title: '',
                headerTransparent: true,
                headerRight: () => (
                  <Button onPress={() => loggingOut()} title='Logout' color='#786EE2' />
                ),
                headerTintColor: '#786EE2',
              }}
            />

            <Stack.Screen
              name='FoodDetails'
              component={FoodDetails}
              options={{
                title: '',
                headerTintColor: props.theme.palette.blueLight,
                headerTransparent: true,
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

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    updateAlreadyExists: state.updateAlreadyExists,
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  userSignedOut,
  errorMessageCreated,
  shouldStartLoading,
  shouldStopLoading,
})(Main);
