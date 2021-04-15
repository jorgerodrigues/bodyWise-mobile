import React, { FC } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

export const FoodDetails: FC = () => {
  return (
    <View>
      <View>
        <Text>Meal Type</Text>
        <TextInput></TextInput>
      </View>
      <View>
        <Text>What did you eat?</Text>
        <TextInput
          style={{
            margin: 2,
            backgroundColor: 'white',
            height: 20,
            width: 100,
          }}></TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
