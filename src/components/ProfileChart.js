import React from 'react';
import { View, Dimensions, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

const ProfileChart = (props) => {
  let data = [];
  let labels = [];
  let updateData = [];
  let dates;

  const generateDates = () => {
    if (props.updatesFetched.length < 1) {
      return console.log('No updates fetched');
    }
    var dates = props.updatesFetched.map((update) => {
      console.log('CreatedAt: ', update.createdAt);
      // todo : this seems to be an async operation and I need to figure how to coordinate that with the chart display
      const date = update.createdAt.toDate();
      console.log(dayjs(date).format('DD-MMM'));
      return dayjs(update.createdAt.toDate()).format('DD-MMM');
    });
    return dates;
  };

  dates = generateDates();

  updateData = props.updatesFetched.map((update) => {
    switch (update.howDoYouFeelToday) {
      case 'Very Bad':
        return 1;
      case 'Not well':
        return 2;
      case 'Ok':
        return 3;
      case 'Well':
        return 4;
      case 'Very Well':
        return 5;
      default:
        break;
    }
  });
  updateData = updateData.slice(0, 6);
  console.log(updateData);
  dates = dates.slice(0, 6);
  if (updateData.length >= 6) {
    for (let i = 1; i <= 6; i++) {
      data.push(updateData[updateData.length - i]);
      labels.push(dates[dates.length - i]);
    }
  } else if (updateData.length < 1) {
    updateData = [0];
    data = updateData;
    labels = ['No data yet'];
    return (
      <View>
        <Text style={styles.noUpdates}>No updates yet</Text>
      </View>
    );
  } else {
    data = updateData.reverse();
    labels = dates.reverse();
  }

  while (updateData[0] == undefined) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: [...data],
            },
          ],
        }}
        width={Dimensions.get('window').width - 30} // from react-native
        height={220}
        yAxisLabel=''
        yAxisSuffix=''
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#F8FAFC',
          backgroundGradientFrom: '#F8FAFC',
          backgroundGradientTo: '#F8FAFC',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(120, 110, 226, 1)`,
          labelColor: (opacity = 1) => `rgba(120, 110, 226, 1)`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '1',
            stroke: '#786EE2',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noUpdates: {
    alignSelf: 'center',
    fontSize: 30,
    color: '#A8A1EC',
    fontFamily: 'Nobile_700Bold',
  },
});

const mapStateToProps = (state) => {
  return {
    updatesFetched: state.updatesFetched,
  };
};

export default connect(mapStateToProps, {})(ProfileChart);
