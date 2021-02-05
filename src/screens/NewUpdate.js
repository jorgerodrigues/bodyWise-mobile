import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
} from '../actions/index';
import DateDisplay from '../components/DateDisplay';
import SingleStatus from '../components/SingleStatus';
import JournalTextField from '../components/JournalTextField';
import PrimaryButton from '../components/PrimaryButton';
import SuccessMessage from '../components/SuccessMessage';

const NewUpdate = (props) => {
  const deviceWidth = useWindowDimensions.width;
  const deviceHeight = useWindowDimensions().height;

  const URL = 'http://127.0.0.1:3000';
  const userName = props.isUserLoggedIn.user.name;

  const [loadedFont] = useFonts({
    Oxygen_400Regular,
    Nobile_700Bold,
  });

  const signOut = async () => {
    try {
      const response = await axios.post(
        `${URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${props.isUserLoggedIn.token}`,
          },
        }
      );
      console.log(response.message);
    } catch (e) {
      console.log(e.message);
    }
    props.userSignedOut();
    await SecureStore.deleteItemAsync('token');
  };

  const saveUpdate = async (props) => {
    console.log(props.isUserLoggedIn);
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
      console.log(response.message);
      props.successMessageCreated('Your update was saved.');
      console.log(props.errorOrSuccessMessage);
    } catch (e) {
      console.log(e.message);
    }
  };

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={{ width: deviceWidth, height: deviceHeight + 100 }}>
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

        <Button
          title={'Sign out'}
          onPress={() => {
            signOut();
          }}
        />
        <PrimaryButton
          title={'Save update'}
          callback={() => {
            saveUpdate(props);
          }}
        />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    fontFamily: 'Nobile_700Bold',
    color: '#F8FAFC',
    fontSize: 38,
    alignSelf: 'center',
    marginTop: 75,
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
  };
};

export default connect(mapStateToProps, {
  userLoggedIn,
  userSignedOut,
  successMessageCreated,
})(NewUpdate);
