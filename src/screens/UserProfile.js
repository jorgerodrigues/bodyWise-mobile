import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import axios from 'axios';
import dayjs from 'dayjs';
import { URL } from '../config/environment';

import {
  updatesAreFetched,
  userSignedOut,
  shouldStartLoading,
  shouldStopLoading,
} from '../actions';
import StatusDisplayProfile from '../components/StatusDisplayProfile';
import ProfileChart from '../components/ProfileChart';

const UserProfile = (props) => {
  const allUpdates = [];

  const getPastUserUpdates = async () => {
    console.log(allUpdates);
    props.shouldStartLoading();
    try {
      const response = await axios.get(`${URL}/updates/me`, {
        headers: {
          Authorization: `Bearer ${props.isUserLoggedIn.token}`,
        },
      });
      console.log(response.data);
      response.data.forEach((update) => {
        allUpdates.push(update);
      });
      props.updatesAreFetched(allUpdates);
      props.shouldStopLoading();
      return allUpdates;
    } catch (error) {
      console.log(error.message);
      props.shouldStopLoading();
    }
  };

  const updatesComponent = props.updatesFetched.map((update, index) => {
    return (
      <StatusDisplayProfile
        date={dayjs(update.createdAt).format('DD-MMM-YYYY')}
        update={update.howDoYouFeelToday}
        key={index}
      />
    );
  });

  useEffect(() => {
    getPastUserUpdates();
    console.log('Effect ran!');
    // eslint-disable-next-line
  }, []);

  const [loadedFont] = useFonts({
    Oxygen_400Regular,
    Nobile_700Bold,
  });

  if (props.isLoading == true) {
    return (
      <View style={styles.activtyIndicator}>
        <ActivityIndicator size='large' color='#A8A1EC' />
      </View>
    );
  }

  return (
    <ScrollView style={styles.fullView}>
      <View style={styles.usernameAndEmailContainer}>
        <Text style={styles.userName}>{props.isUserLoggedIn.user.name}</Text>
        <Text style={styles.userEmail}>{props.isUserLoggedIn.user.email}</Text>
      </View>
      {allUpdates != [] ? <ProfileChart /> : <Text>No updates yet</Text>}

      <View style={styles.allUpdates}>{updatesComponent}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fullView: {
    backgroundColor: '#F8FAFC',
  },
  usernameAndEmailContainer: {
    marginTop: 120,
    alignItems: 'center',
    marginBottom: 50,
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
  signOutButton: {
    marginVertical: 75,
  },
  activtyIndicator: {
    paddingVertical: 300,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
    updatesFetched: state.updatesFetched,
    singleUpdate: state.singleUpdate,
    isLoading: state.isLoading,
    journalText: state.journalText,
  };
};

export default connect(mapStateToProps, {
  updatesAreFetched,
  userSignedOut,
  shouldStartLoading,
  shouldStopLoading,
})(UserProfile);
