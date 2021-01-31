import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Oxygen_400Regular } from '@expo-google-fonts/oxygen';

const TextField = (props) => {
  //
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
    <View>
      <TextInput
        style={styles.inputField}
        autoCapitalize={'sentences'}
        multiline={true}
        numberOfLines={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#D7D4F7',
    marginHorizontal: 50,
    marginVertical: 10,
    borderRadius: 10,
    minHeight: 150,
    maxHeight: 200,
    color: '#786EE2',
    fontSize: 15,
    fontFamily: 'Oxygen_400Regular',
    padding: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps)(TextField);
