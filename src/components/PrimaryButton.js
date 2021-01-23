import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useFonts, Oxygen_700Bold } from '@expo-google-fonts/oxygen';

const PrimaryButton = (props) => {
  useFonts({
    Oxygen_700Bold,
  });

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 161,
    backgroundColor: '#786EE2',
    justifyContent: 'center',
  },

  buttonContainer: {
    alignItems: 'center',
    margin: 20,
  },

  buttonText: {
    fontFamily: 'Oxygen_700Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#F8FAFC',
    textAlign: 'center',
  },
});

export default PrimaryButton;
