import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const WaveBottom = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return (
    <View>
      <Svg
        width={`${windowWidth}`}
        // the multiplication in the height value makes sure that the wave overflow the window downwards
        height={`${windowHeight * 1.18} `}
        viewBox={`0 0 ${windowWidth} ${windowHeight}`}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <Path
          d={`M0 284V0.00062697C121.144 -0.161518 219.753 31.0794 ${windowWidth} 144V284H0Z`}
          fill='#786EE2'
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WaveBottom;
