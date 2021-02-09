import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import axios from 'axios';
import dayjs from 'dayjs';

import { updatesAreFetched } from '../actions';
import StatusDisplayProfile from '../components/StatusDisplayProfile';

const UserProfile = (props) => {
  // const [loadedFont] = useFonts({
  //   Oxygen_400Regular,
  //   Nobile_700Bold,
  // });

  // if (!loadedFont) {
  //   return (
  //     <View>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }
  const getPastUserUpdates = async () => {
    const URL = 'http://127.0.0.1:3000';
    const allUpdates = [];
    try {
      const response = await axios.get(`${URL}/updates/me`, {
        headers: {
          Authorization: `Bearer ${props.isUserLoggedIn.token}`,
        },
      });
      response.data.forEach((update) => {
        allUpdates.push(update);
      });
      props.updatesAreFetched(allUpdates);
      return allUpdates;
    } catch (error) {
      console.log(error.message);
    }
  };

  //TODO : format the date to show according to mockups
  const updatesComponent = props.updatesFetched.map((update) => {
    return (
      <StatusDisplayProfile
        date={dayjs(update.createdAt).format('DD-MMM-YYYY')}
        update={update.howDoYouFeelToday}
      />
    );
  });

  useEffect(() => {
    getPastUserUpdates();

    // eslint-disable-next-line
  }, []);

  return (
    <View>
      <View style={styles.usernameAndEmailContainer}>
        <Text style={styles.userName}>{props.isUserLoggedIn.user.name}</Text>
        <Text style={styles.userEmail}>{props.isUserLoggedIn.user.email}</Text>
      </View>
      <View style={styles.allUpdates}>{updatesComponent}</View>
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
    updatesFetched: state.updatesFetched,
  };
};

export default connect(mapStateToProps, { updatesAreFetched })(UserProfile);
