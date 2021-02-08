import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import axios from 'axios';

import StatusDisplayProfile from '../components/StatusDisplayProfile';

const UserProfile = (props) => {
  const [loadedFont] = useFonts({
    Oxygen_400Regular,
    Nobile_700Bold,
  });

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  // console.log(props.isUserLoggedIn.token);
  const getPastUserUpdates = async () => {
    console.log(props.isUserLoggedIn.token);
    const URL = 'http://127.0.0.1:3000';
    try {
      const response = await axios.get(`${URL}/updates/me`, {
        headers: {
          Authorization: `Bearer ${props.isUserLoggedIn.token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <View style={styles.usernameAndEmailContainer}>
        <Text style={styles.userName}>{props.isUserLoggedIn.user.name}</Text>
        <Text style={styles.userEmail}>{props.isUserLoggedIn.user.email}</Text>
      </View>
      <View style={styles.allUpdates}>
        <StatusDisplayProfile />
        <StatusDisplayProfile />
        <StatusDisplayProfile />
        <StatusDisplayProfile />
        <StatusDisplayProfile />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  usernameAndEmailContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  userName: {
    fontFamily: 'Nobile_700Bold',
    color: '#221980',
    fontSize: 40,
    alignSelf: 'center',
  },
  userEmail: {
    fontFamily: 'Oxygen_400Regular',
    fontSize: 14,
    color: '#A8A1EC',
  },
  allUpdates: {
    marginTop: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps)(UserProfile);
