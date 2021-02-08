import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Oxygen_300Light } from '@expo-google-fonts/oxygen';
import { Nobile_700Bold } from '@expo-google-fonts/nobile';
import Svg, { Circle } from 'react-native-svg';

const StatusDisplayProfile = (props) => {
  const [loadedFont] = useFonts({
    Oxygen_300Light,
    Nobile_700Bold,
  });

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log('Receiving component props:');
  console.log(props);

  return (
    <View style={styles.updatesContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.date}>{props.date}</Text>
        <Text style={styles.status}>{props.update}</Text>
      </View>
      <View style={styles.dot}>
        <Svg
          width='10'
          height='10'
          viewBox='0 0 10 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <Circle cx='5' cy='5' r='5' fill='#D7D4F7' />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  updatesContainer: {},

  statusContainer: {
    marginTop: 25,
    alignSelf: 'center',
    alignItems: 'center',
  },
  date: {
    fontFamily: 'Oxygen_300Light',
    fontSize: 14,
    color: '#786EE2',
  },
  status: {
    fontFamily: 'Nobile_700Bold',
    fontSize: 28,
    color: '#786EE2',
  },
  dot: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default StatusDisplayProfile;
