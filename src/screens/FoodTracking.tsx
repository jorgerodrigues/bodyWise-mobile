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
  }, []);
  //
  const generateMarkers = (): React.ReactNode => {
    return todaysMeals.map((e, index) => {
      return (
        <View key={index} style={{ alignSelf: 'center', height: 85 }}>
          <DotMarker></DotMarker>
        </View>
      );
    });
  };

  const generateFullListOfMealsWithContent = (): React.ReactNode => {
    return todaysMeals.map((e, index): React.ReactNode => {
      return (
        <View
          style={{
            ...styles.mealInfoContainer,
            marginVertical: theme.spacing.l,
            height: 50,
            paddingVertical: theme.spacing.xs,
          }}
          key={index}>
          <DotMarker></DotMarker>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: theme.spacing.xl * 6.5,
              paddingVertical: 2,
            }}>
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
              }}>
              {generateMealContent(e.food)}
            </View>
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
            textAlign: 'right',
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
      decelerationRate={'fast'}
      style={{
        ...styles.background,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flexDirection: 'row', marginLeft: 40 }}>
        <RecessedVerticalBar style={{ ...styles.verticalBar, height: todaysMeals.length * 100 }}>
          <View style={{ paddingTop: 20 }}>{generateMarkers()}</View>
        </RecessedVerticalBar>
        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            alignItems: 'flex-start',
            marginTop: theme.spacing.fromTop - 13,
            marginLeft: 5,
          }}>
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
    width: 50,
    marginTop: 120,
  },
  mealInfoContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  mealTypeContainer: {
    marginLeft: 10,
  },
  mealType: {
    alignSelf: 'flex-start',
    color: '#F8FAFC',
  },
  mealContentContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignContent: 'flex-end',
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
