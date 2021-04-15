import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const DotMarker: FC = () => {
  return (
    <View style={styles.dot}>
      <LinearGradient
        style={styles.gradient}
        colors={['#FFFFFF', '#F5E7B8', '#EFD992']}
        locations={[0.1, 0.6, 1]}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}></LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    alignSelf: 'center',
    paddingVertical: 30,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 0.8,
  },
  gradient: {
    position: 'relative',

    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
