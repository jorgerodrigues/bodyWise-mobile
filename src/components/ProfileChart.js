import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Line } from 'react-native-svg';

const ProfileChart = () => {
  const labels = ['12-Jan', '13-Jan', '14-Jan', '15-Jan', '16-Jan'];
  const fakeData = [1, 2, 4, 5, 5];

  return (
    <View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: [...fakeData],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel=''
        yAxisSuffix=''
        yAxisInterval={1} // optional, defaults to 1>
        chartConfig={{
          backgroundColor: '#F8FAFC',
          backgroundGradientFrom: '#F8FAFC',
          backgroundGradientTo: '#F8FAFC',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(120, 110, 226, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(120, 110, 226, ${opacity})`,
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

export default ProfileChart;
