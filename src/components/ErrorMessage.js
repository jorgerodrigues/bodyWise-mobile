import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';
import { connect } from 'react-redux';

const ErrorMessage = (props) => {
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
    <View style={styles.errorBackground}>
      <Text style={styles.textStyle}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBackground: {
    backgroundColor: '#F2D9D9',
    shadowColor: '#732628',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  textStyle: {
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
