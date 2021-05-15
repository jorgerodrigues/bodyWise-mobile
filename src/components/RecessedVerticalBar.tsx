import React, { FC, ReactChild } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AppProps {
  style: {
    height: number;
    width: number;
    marginTop: number;
    marginLeft: number;
  };
  children?: React.ReactNode;
}

export const RecessedVerticalBar: FC<AppProps> = (props: AppProps) => {
  return (
    <View style={props.style}>
      <LinearGradient
        colors={['#6156DC', '#786EE2', '#8178E5']}
        style={styles.sideTrackInner}
        locations={[0.2, 0.8, 1]}
        start={{ x: -1, y: 0 }}
        end={{ x: 1, y: 0 }}>
        {/* {props.children ? props.children : <></>} */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  sideTrack: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#786EE2',
    zIndex: 10000,
    height: 650,
    width: 50,
    alignContent: 'center',
    borderRadius: 10,
  },
  sideTrackInner: {
    flex: 1,
    borderRadius: 10,
  },
});
