import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';

import { userLoggedIn, userSignedOut } from '../actions/index';
import DateDisplay from '../components/DateDisplay';
import SingleStatus from '../components/SingleStatus';

const NewUpdate = (props) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  // todo : Add a separate signout function. The function should send an api call to signout on the server and after that, trigger the signout action

  const signOut = () => {};

  const userName = props.isUserLoggedIn.user.name;

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
    <View>
      <ImageBackground
        source={require('../../assets/background.png')}
        style={{ width: deviceWidth, height: deviceHeight }}>
        <Text style={styles.mainHeader}>Hey {userName}</Text>
        <DateDisplay></DateDisplay>
        <Text style={styles.secondHeader}>How do you feel today?</Text>
        <SingleStatus fill={'#D7D4F7'}></SingleStatus>
        <Button
          title={'Sign out'}
          onPress={() => {
            props.userSignedOut();
          }}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    fontFamily: 'Nobile_700Bold',
    color: '#F8FAFC',
    fontSize: 38,
    alignSelf: 'center',
    marginTop: 150,
  },
  secondHeader: {
    fontFamily: 'Nobile_700Bold',
    color: '#E9F1F7',
    fontSize: 32,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 25,
    marginBottom: 10,
    marginHorizontal: 80,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { userLoggedIn, userSignedOut })(
  NewUpdate
);
