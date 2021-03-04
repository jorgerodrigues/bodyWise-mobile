import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { useFonts, Nobile_700Bold } from '@expo-google-fonts/nobile';

const ProfileChart = (props) => {
  var data = [];
  var labels = [];
  const dates = props.updatesFetched.map((update) => {
    return dayjs(update.createdAt).format('DD-MMM');
  });
  var updateData = props.updatesFetched.map((update) => {
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

  if (updateData.length >= 10) {
    for (let i = updateData.length; i > updateData.length - 10; i--) {
      data.push(updateData[i]);
      labels.push(dates[i]);
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

  const [loadedFont] = useFonts({
    Nobile_700Bold,
  });

  if (!loadedFont) {
    return (
      <View>
        <Text>Loading...</Text>
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
