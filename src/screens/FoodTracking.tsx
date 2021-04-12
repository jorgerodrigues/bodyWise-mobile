import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { DotMarker } from '../components/DotMarker';
import { RecessedVerticalBar } from '../components/RecessedVerticalBar';

// TODO: Add a function that takes the number of items for that day and generates enough dots
// TODO: Add the text components outside of the recessed bar and figure how to align them to the dots
export const FoodTracking: FC = () => {
  return (
    <View style={styles.background}>
      <RecessedVerticalBar style={styles.verticalBar}>
        <DotMarker></DotMarker>
      </RecessedVerticalBar>
      <Text style={styles.mealLabel}>Breakfast</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#786EE2',
  },
  verticalBar: {
    height: 650,
    width: 50,
    marginTop: 120,
    marginLeft: 40,
  },
  mealLabel: {
    fontSize: 24,
    fontFamily: 'Oxygen_300Light',
    color: '#F8FAFC',
    marginTop: 130,
    marginLeft: 8,
  },
});
