import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const SingleDate = (props) => {
  var textColor = '#fff';
  var daySize = 50;
  var monthYearSize = 13;
  if (props.type === 'primary') {
    textColor = '#F5E7B8';
    daySize = 50;
    monthYearSize = 14;
  } else {
    textColor = '#D7D4F7';
    daySize = 30;
    monthYearSize = 9;
  }

  return (
    <View style={styles.dateContainer}>
      <View>
        <Text style={{ ...styles.day, color: textColor, fontSize: daySize }}>
          {props.date.day}
        </Text>
        <View style={styles.monthAndYearContainer}>
          <Text
            style={{
              ...styles.month,
              color: textColor,
              fontSize: monthYearSize,
            }}>
            {props.date.month}
          </Text>
          <Text
            style={{
              ...styles.month,
              color: textColor,
              fontSize: monthYearSize,
            }}>
            {' '}
          </Text>
          <Text
            style={{
              ...styles.year,
              color: textColor,
              fontSize: monthYearSize,
            }}>
            {props.date.year}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  day: {
    fontFamily: 'Oxygen_300Light',
    alignContent: 'center',
    textAlign: 'center',
  },
  month: {
    color: '#F5E7B8',
    fontFamily: 'Oxygen_300Light',
  },
  year: {
    color: '#F5E7B8',
    fontFamily: 'Oxygen_300Light',
  },
  monthAndYearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

export default SingleDate;
