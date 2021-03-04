import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import axios from 'axios';
import dayjs from 'dayjs';

import {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
  singleUpdateIsSet,
  journalIsUpdated,
  todaysUpdatesAlreadyExists,
  shouldStartLoading,
  shouldStopLoading,
} from '../actions/index';
import DateDisplay from '../components/DateDisplay';
import SingleStatus from '../components/SingleStatus';
import JournalTextField from '../components/JournalTextField';
import PrimaryButton from '../components/PrimaryButton';
import SuccessMessage from '../components/SuccessMessage';
import ProfileIcon from '../components/ProfileIcon';
import { URL } from '../config/environment';

const NewUpdate = (props) => {
  const userName = props.isUserLoggedIn.user.name;
  const [today, setToday] = useState(dayjs().format('DD-MMM-YYYY'));

  const saveUpdate = async (props) => {
    props.shouldStartLoading();
    try {
      const response = await axios.post(
        `${URL}/me/how-do-you-feel`,
        {
          howDoYouFeelToday: props.singleUpdate,
          comments: props.journalText,
        },
        {
          headers: {
            Authorization: `Bearer ${props.isUserLoggedIn.token}`,
          },
        }
      );
      props.successMessageCreated('Your status was saved.');
      props.todaysUpdatesAlreadyExists(response);
      props.shouldStopLoading();
    } catch (e) {
      console.log(e);
      props.shouldStopLoading();
    }
  };

  const checkForUpdate = async () => {
    props.todaysUpdatesAlreadyExists(null);
    props.shouldStartLoading();
    try {
      const response = await axios.get(`${URL}/updates/latest`, {
        headers: {
          Authorization: `Bearer ${props.isUserLoggedIn.token}`,
        },
      });

      const fullData = response.data;
      const todaysDate = dayjs().format('DD-MMM-YYYY');
      const updateDate = dayjs(fullData.createdAt).format('DD-MMM-YYYY');
      console.log('Server response: ', response.data);
      console.log('Todays date  ', todaysDate);
      console.log('UpdatesDate, ', updateDate);

      if (todaysDate == updateDate) {
        props.todaysUpdatesAlreadyExists(fullData);
        props.singleUpdateIsSet(fullData.howDoYouFeelToday);
        props.journalIsUpdated(fullData.comments);
      }
      props.shouldStopLoading();
    } catch (e) {
      console.log(e.message);
      props.shouldStopLoading();
    }
  };

  const updateCurrentUpdate = async () => {
    props.shouldStartLoading();
    const itemToBeUpdated = props.updateAlreadyExists._id;
    try {
      await axios.patch(
        `${URL}/updates/${itemToBeUpdated}`,
        {
          howDoYouFeelToday: props.singleUpdate,
          comments: props.journalText,
        },
        {
          headers: {
            Authorization: `Bearer ${props.isUserLoggedIn.token}`,
          },
        }
      );
      props.successMessageCreated('Your status was updated.');
      props.shouldStopLoading();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    console.log('Single useEffect ran');
    setToday(dayjs().format('DD-MMM-YYYY'));
    props.todaysUpdatesAlreadyExists(null);
    props.shouldStopLoading();
    checkForUpdate();
  }, []);

  useEffect(() => {
    console.log('Use effect with return ran');
    let mounted = true;
    props.todaysUpdatesAlreadyExists(null);
    props.shouldStopLoading();
    checkForUpdate();

    return () => {
      mounted = false;
    };
  }, [props.todaysDate]);

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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior='position'
      keyboardVerticalOffset={1}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('UserProfile');
          }}>
          <ProfileIcon style={styles.profileIcon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.mainHeader}>Hey {userName}</Text>
          {props.errorOrSuccessMessage.message == undefined || '' || null ? (
            <></>
          ) : (
            <SuccessMessage message={props.errorOrSuccessMessage.message} />
          )}
          <DateDisplay></DateDisplay>

          <Text style={styles.secondHeader}>How do you feel today?</Text>
          <SingleStatus fill={'#D7D4F7'}></SingleStatus>

          {props.singleUpdate ? (
            <View>
              <Text style={styles.bodyText}>
                Here's the journal if you feel like doing it today
              </Text>
              <JournalTextField></JournalTextField>
            </View>
          ) : (
            <></>
          )}
          {props.isLoading == true ? (
            <ActivityIndicator />
          ) : props.updateAlreadyExists == null ? (
            <PrimaryButton
              title={'Save update'}
              callback={() => {
                saveUpdate(props);
              }}
            />
          ) : (
            <PrimaryButton
              title={'Update'}
              callback={() => {
                updateCurrentUpdate(props);
              }}
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#786EE2',
  },
  scrollViewContainer: {
    justifyContent: 'flex-end',
  },
  profileIcon: {
    marginTop: 30,
  },
  mainHeader: {
    fontFamily: 'Nobile_700Bold',
    color: '#F8FAFC',
    fontSize: 38,
    alignSelf: 'center',
    marginTop: 15,
  },
  secondHeader: {
    fontFamily: 'Nobile_700Bold',
    color: '#E9F1F7',
    fontSize: 32,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 80,
  },

  bodyText: {
    fontFamily: 'Oxygen_400Regular',
    fontSize: 15,
    color: '#D7D4F7',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    journalText: state.journalText,
    singleUpdate: state.singleUpdate,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
    updateAlreadyExists: state.updateAlreadyExists,
    isLoading: state.isLoading,
    todaysDate: state.todaysDate,
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
  singleUpdateIsSet,
  journalIsUpdated,
  todaysUpdatesAlreadyExists,
  shouldStartLoading,
  shouldStopLoading,
})(NewUpdate);
