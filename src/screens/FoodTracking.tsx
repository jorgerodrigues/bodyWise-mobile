import React, { FC, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { DotMarker } from '../components/DotMarker';
import { RecessedVerticalBar } from '../components/RecessedVerticalBar';
import { connect } from 'react-redux';
import { StateAppProps, Theme, IsLoggedIn, TodaysMeal } from '../@types';
import PrimaryButton from '../components/PrimaryButton';
import { fetchAllMealsOfToday } from '../Modules/mealsDataManipulation';
import { todaysMealsSet } from '../actions/index';

interface AppProps {
  theme: Theme;
  navigation: any;
  isUserLoggedIn: IsLoggedIn;
  todaysDate: string;
  todaysMealsSet: any;
  todaysMeals: [TodaysMeal];
}

//
const FoodTracking: FC<StateAppProps> = ({
  theme,
  navigation,
  isUserLoggedIn,
  todaysDate,
  todaysMealsSet,
  todaysMeals,
}: AppProps) => {
  //
  useEffect(() => {
    fetchAllMeals();
  });
  //
  const generateMarkers = (): React.ReactNode => {
    return todaysMeals.map((e, index) => {
      return (
        <View key={index} style={{ marginVertical: 31, alignSelf: 'center' }}>
          <DotMarker></DotMarker>
        </View>
      );
    });
  };

  const generateFullListOfMealsWithContent = (): React.ReactNode => {
    return todaysMeals.map((e, index): React.ReactNode => {
      return (
        <View style={{ ...styles.mealInfoContainer, marginVertical: theme.spacing.l }} key={index}>
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
              {e.meal}
            </Text>
          </View>
          <View
            style={{
              ...styles.mealContentContainer,
              marginLeft: theme.spacing.xxl,
            }}>
            {generateMealContent(e.food)}
          </View>
        </View>
      );
    });
  };

  const generateMealContent = (foods): React.ReactNode => {
    return foods.map((e) => {
      return (
        <Text
          key={e.id}
          style={{
            color: theme.palette.greyTransparent,
            fontFamily: theme.textVariants.bodyLight.fontFamily,
          }}>
          {e.food}
        </Text>
      );
    });
  };

  const fetchAllMeals = async (): Promise<void> => {
    const meals = await fetchAllMealsOfToday(isUserLoggedIn.user.UserID, todaysDate);
    todaysMealsSet(meals);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        ...styles.background,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flexDirection: 'row' }}>
        <RecessedVerticalBar style={styles.verticalBar}>{generateMarkers()}</RecessedVerticalBar>
        <View style={{ flexDirection: 'column', marginTop: theme.spacing.fromTop - 13 }}>
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

const mapStateToProps = (state: StateAppProps) => {
  return {
    theme: state.theme,
    isUserLoggedIn: state.isLoggedIn,
    todaysDate: state.todaysDate,
    todaysMeals: state.todaysMeals,
  };
};

export default connect(mapStateToProps, { todaysMealsSet })(FoodTracking);
