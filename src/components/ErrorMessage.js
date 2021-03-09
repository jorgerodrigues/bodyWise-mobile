import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';

const ErrorMessage = (props) => {
  return (
    <View style={styles.errorMessage}>
      <Text style={styles.errorTextStyle}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    backgroundColor: '#F2D9D9',
    width: 200,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#732628',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  errorTextStyle: {
    color: '#C24749',
    padding: 15,
    fontFamily: 'Oxygen_400Regular',
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(ErrorMessage);
