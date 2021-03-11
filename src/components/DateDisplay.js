import React, { useEffect, useState } from 'react';
import { View, StyleSheet, AppState } from 'react-native';
import dayjs from 'dayjs';
import SingleDate from './SingleDate';
import { todaysDateIsSet } from '../actions/index';
import { connect } from 'react-redux';

const DateDisplay = (props) => {
  //Setting current dates as part of the state
  const [currentFullDate, setCurrentFullDate] = useState(
    dayjs().format('DD-MMM-YYYY')
  );
  const [tomorrowFullDate, setTomorrowFullDate] = useState(
    dayjs().add(1, 'day').format('DD-MMM-YYYY')
  );
  const [yesterdayFullDate, setYestdayFullDate] = useState(
    dayjs().subtract(1, 'day').format('DD-MMM-YYYY')
  );

  // Sets and tracks the current date on the date display upon change while the app is in background
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    setCurrentFullDate(dayjs().format('DD-MMM-YYYY'));
    setTomorrowFullDate(dayjs().add(1, 'day').format('DD-MMM-YYYY'));
    setYestdayFullDate(dayjs().subtract(1, 'day').format('DD-MMM-YYYY'));
    props.todaysDateIsSet(currentFullDate);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  });

  // Sets and tracks the current date on the date display
  const handleAppStateChange = () => {
    setCurrentFullDate(dayjs().format('DD-MMM-YYYY'));
    setTomorrowFullDate(dayjs().add(1, 'day').format('DD-MMM-YYYY'));
    setYestdayFullDate(dayjs().subtract(1, 'day').format('DD-MMM-YYYY'));
    props.todaysDateIsSet(currentFullDate);
  };

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

  // Formatting the date
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

const mapStateToProps = (state) => {
  return {
    todaysDate: state.todaysDate,
  };
};

export default connect(mapStateToProps, { todaysDateIsSet })(DateDisplay);
