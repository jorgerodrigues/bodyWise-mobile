import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { connect } from 'react-redux';

import { singleUpdateIsSet, updateValueSet } from '../../actions';

interface AppProps {
  singleUpdateIsSet: (arg: string) => void;
  updateValueSet: (arg: number) => void;
}

const HowDoIFeelSlider = (props: AppProps) => {
  const [howDoIFeelToday, setHowDoIFeelToday] = useState<number>(5);
  const currentValue = useRef(howDoIFeelToday);

  const statusIsSet = () => {
    console.log('Props: ', props);
    const status = sliderText(currentValue.current);
    props.updateValueSet(currentValue.current);
    props.singleUpdateIsSet(status);
  };

  const sliderText = (value: number) => {
    if (value < 2) {
      return 'Very Bad';
    }
    if (value < 4.2) {
      return 'Bad';
    }
    if (value >= 4.2 && value <= 5.8) {
      return 'Ok';
    }
    if (value <= 8) {
      return 'Well';
    } else {
      return 'Very Well';
    }
  };

  return (
    <View>
      <Text
        style={{
          alignSelf: 'center',
          paddingTop: 20,
          fontFamily: 'Oxygen_300Light',
          fontSize: 20,
          color: '#FFF',
        }}>
        {sliderText(currentValue.current)}
      </Text>
      <Slider
        style={{ width: '80%', height: 60, alignSelf: 'center' }}
        minimumValue={0}
        maximumValue={10}
        value={howDoIFeelToday}
        minimumTrackTintColor='#F5E7B8'
        maximumTrackTintColor='#FFFFFF'
        thumbTintColor='#F5E7B8'
        onSlidingComplete={(sliderValue) => {
          currentValue.current = sliderValue;
          setHowDoIFeelToday(sliderValue);
          statusIsSet();
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { singleUpdateIsSet, updateValueSet })(HowDoIFeelSlider);
