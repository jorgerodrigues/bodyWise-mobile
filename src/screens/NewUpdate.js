import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import { userLoggedIn, userSignedOut } from '../actions/index';

const NewUpdate = (props) => {
  // todo : Add a separate signout function. The function should send an api call to signout on the server and after that, trigger the signout action
  const userName = props.isUserLoggedIn.user.name;
  return (
    <View>
      <Text>Hey {userName}</Text>
      <Button
        title={'Sign out'}
        onPress={() => {
          props.userSignedOut();
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
