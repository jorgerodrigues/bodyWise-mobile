import React from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { userLoggedIn, userSignedOut } from '../actions/index';

const NewUpdate = (props) => {
  return (
    <View>
      <Text>This is page number 1</Text>
      <Button
        title={'Sign out'}
        onPress={() => {
          props.userSignedOut();
          console.log(props);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, { userLoggedIn, userSignedOut })(
  NewUpdate
);
