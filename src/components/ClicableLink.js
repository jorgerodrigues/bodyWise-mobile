import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const ClickableLink = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          props.callback();
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
  },

  buttonContainer: {
    alignItems: 'center',
  },

  buttonText: {
    fontFamily: 'Oxygen_400Regular',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ClickableLink;
