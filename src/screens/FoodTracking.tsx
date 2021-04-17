import React, { FC } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { DotMarker } from '../components/DotMarker';
import { RecessedVerticalBar } from '../components/RecessedVerticalBar';
import { connect } from 'react-redux';
import { StateAppProps, Theme } from '../@types';
import PrimaryButton from '../components/PrimaryButton';

// Fake data for testing the component
type fakeInfo = { mealType: string; mealContent: string[] }[];
const fakeData: fakeInfo = [
  {
    mealType: 'Breakfast',
    mealContent: ['Peanut', 'Apple', 'Capuccino'],
  },
  {
    mealType: 'Breakfast',
    mealContent: ['Peanut', 'Apple', 'Capuccino'],
  },
  {
    mealType: 'Lunch',
    mealContent: ['Meat', 'Beans', 'Salad'],
  },
  {
    mealType: 'Breakfast',
    mealContent: ['Peanut', 'Apple', 'Capuccino'],
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

//
const FoodTracking: FC<StateAppProps> = ({ theme, navigation }: AppProps) => {
  //
  const generateMarkers = (): React.ReactNode => {
    return fakeData.map((e, index) => {
      return (
        <View key={index} style={{ marginVertical: 31, alignSelf: 'center' }}>
          <DotMarker></DotMarker>
        </View>
      );
    });
  };

  const generateFullListOfMealsWithContent = (): React.ReactNode => {
    return fakeData.map(
      (e): React.ReactNode => {
        return (
          <View
            style={{ ...styles.mealInfoContainer, marginVertical: theme.spacing.l }}>
            <View
              style={{
                ...styles.mealTypeContainer,
              }}>
              <Text
                style={{
                  ...styles.mealType,
                  fontSize: theme.textVariants.subHeaderLight.fontSize,
                  fontFamily: theme.textVariants.subHeaderLight.fontFamily,
                }}>
                {e.mealType}
              </Text>
            </View>
            <View
              style={{
                ...styles.mealContentContainer,
                marginLeft: theme.spacing.xxl,
              }}>
              {generateMealContent()}
            </View>
          </View>
        );
      }
    );
  };

  const generateMealContent = (): React.ReactNode => {
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
      contentContainerStyle={{
        ...styles.background,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <RecessedVerticalBar style={styles.verticalBar}>
          {generateMarkers()}
        </RecessedVerticalBar>
        <View
          style={{ flexDirection: 'column', marginTop: theme.spacing.fromTop - 13 }}>
          {generateFullListOfMealsWithContent()}
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
    flexDirection: 'column',
  },
  verticalBar: {
    height: 650,
    width: 50,
    marginTop: 120,
    marginLeft: 40,
  },
  mealInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealTypeContainer: {
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  mealType: {
    color: '#F8FAFC',
  },
  mealContentContainer: {
    flexDirection: 'column',
    marginLeft: 80,
    alignSelf: 'center',
  },
  mealContent: {},
});

const mapStateToProps = (state: StateAppProps): { theme: Theme } => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(FoodTracking);
