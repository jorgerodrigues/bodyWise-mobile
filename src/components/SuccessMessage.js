import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { connect } from 'react-redux';

const SuccessMessage = (props) => {
  const [loadedFont] = useFonts({
    Oxygen_400Regular,
  });
  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.successMessage}>
      <Text style={styles.successTextStyle}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  successMessage: {
    backgroundColor: '#786EE2',
    marginTop: 20,
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
  successTextStyle: {
    color: '#D7D4F7',
    padding: 15,
    fontFamily: 'Oxygen_400Regular',
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(SuccessMessage);
