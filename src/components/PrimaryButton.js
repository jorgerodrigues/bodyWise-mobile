import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useFonts, Oxygen_700Bold } from '@expo-google-fonts/oxygen';

const PrimaryButton = (props) => {
  // const [loadedFont] = useFonts({
  //   Oxygen_700Bold,
  // });

  // if (!loadedFont) {
  //   return (
  //     <View>
  //       <ActivityIndicator />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          props.callback();
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.title}</Text>
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
