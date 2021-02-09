import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import dayjs from 'dayjs';
import { useFonts, Oxygen_300Light } from '@expo-google-fonts/oxygen';

import SingleDate from './SingleDate';

const DateDisplay = () => {
  const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const currentDateFullDate = dayjs().format('DD-MMM-YYYY');
  const tomorrowFullDate = dayjs().add(1, 'day').format('DD-MMM-YYYY');
  const yesterdayFullDate = dayjs().subtract(1, 'day').format('DD-MMM-YYYY');

  // After getting each date, extract only the date

  const yesterdaysDate = {
    day: dayjs(yesterdayFullDate).get('date'),
    month: monthsShort[dayjs(yesterdayFullDate).get('month')],
    year: dayjs(yesterdayFullDate).get('year'),
  };
  const todaysDate = {
    day: dayjs().get('date'),
    month: monthsShort[dayjs().month()],
    year: dayjs().get('year'),
  };
  const tomorrowsDate = {
    day: dayjs(tomorrowFullDate).get('date'),
    month: monthsShort[dayjs(tomorrowFullDate).get('month')],
    year: dayjs(tomorrowFullDate).get('year'),
  };

  const [loadedFont] = useFonts({
    Oxygen_300Light,
  });

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.dateContainer}>
      <SingleDate type={'secondary'} date={yesterdaysDate}></SingleDate>
      <SingleDate type={'primary'} date={todaysDate}></SingleDate>
      <SingleDate type={'secondary'} date={tomorrowsDate}></SingleDate>
    </View>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    marginVertical: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  todayContainer: {},
  day: {
    fontSize: 50,
    color: '#F5E7B8',
    fontFamily: 'Oxygen_300Light',
  },
  month: {
    fontSize: 13,
    color: '#F5E7B8',
    fontFamily: 'Oxygen_300Light',
  },
  year: {
    fontSize: 13,
    color: '#F5E7B8',
    fontFamily: 'Oxygen_300Light',
  },
  monthAndYearContainer: {
    flexDirection: 'row',
  },
});

export default DateDisplay;
