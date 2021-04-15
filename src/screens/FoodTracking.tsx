import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { DotMarker } from '../components/DotMarker';
import { RecessedVerticalBar } from '../components/RecessedVerticalBar';
import { connect } from 'react-redux';
import { StateAppProps, Theme } from '../@types';
import PrimaryButton from '../components/PrimaryButton';

// Fake data for testing the component
type fakeInfo = [{ mealType: string; mealContent: [string] }];
const fakeData: fakeInfo = [
  {
    mealType: 'Breakfast',
    mealContent: ['Peanut', 'Apple', 'Capuccino'],
  },
  {
    mealType: 'Lunch',
    mealContent: ['Meat', 'Beans', 'Salad'],
  },
  {
    mealType: 'Lunch',
    mealContent: ['Meat', 'Beans', 'Salad'],
  },
];
// end of fake data

interface AppProps {
  theme: Theme;
  navigation: any;
}

// TODO: Add a function that takes the number of items for that day and generates enough dots
// TODO: Add the text components outside of the recessed bar and figure how to align them to the dots
const FoodTracking: FC<StateAppProps> = ({ theme, navigation }: AppProps) => {
  const generateMarkers: React.ReactNode = fakeData.map((e, index) => {
    return (
      <View key={index}>
        <DotMarker></DotMarker>
      </View>
    );
  });

  const generateMealContent = () => {
    for (let i = 0; i <= fakeData.length - 1; i++) {
      return fakeData[i].mealContent.map((e) => {
        return (
          <Text
            style={{
              color: theme.palette.greyTransparent,
              fontFamily: theme.textVariants.bodyLight.fontFamily,
            }}>
            {e}
          </Text>
        );
      });
    }
  };

  return (
    <ScrollView
      style={{ ...styles.background, backgroundColor: theme.colors.background }}>
      <View style={{ flexDirection: 'row' }}>
        <RecessedVerticalBar style={styles.verticalBar}>
          {generateMarkers}
        </RecessedVerticalBar>
        <View style={styles.mealInfoContainer}>
          <View
            style={{
              ...styles.mealTypeContainer,
              marginTop: theme.spacing.fromTop,
            }}>
            <Text
              style={{
                ...styles.mealType,
                fontSize: theme.textVariants.subHeaderLight.fontSize,
                fontFamily: theme.textVariants.subHeaderLight.fontFamily,
                paddingTop: theme.spacing.l,
                paddingBottom: theme.spacing.xl,
              }}>
              Breakfast
            </Text>
          </View>
          <View
            style={{
              ...styles.mealContentContainer,
              marginTop: theme.spacing.fromTop + theme.spacing.m,
              marginLeft: theme.spacing.xxl,
            }}>
            {generateMealContent()}
          </View>
        </View>
      </View>
      <PrimaryButton
        title={'New meal'}
        callback={() => {
          navigation.navigate('FoodDetails');
        }}></PrimaryButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  verticalBar: {
    height: 650,
    width: 50,
    marginTop: 120,
    marginLeft: 40,
  },
  mealInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  mealTypeContainer: {
    marginHorizontal: 10,
    marginTop: 130,
  },
  mealType: {
    color: '#F8FAFC',
  },
  mealContentContainer: {
    flexDirection: 'column',
    marginLeft: 80,
  },
  mealContent: {},
});

const mapStateToProps = (state: StateAppProps): { theme: Theme } => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(FoodTracking);
