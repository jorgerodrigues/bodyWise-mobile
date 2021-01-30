import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

const TextField = (props) => {
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
    marginVertical: 20,
    borderRadius: 10,
    minHeight: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps)(TextField);
