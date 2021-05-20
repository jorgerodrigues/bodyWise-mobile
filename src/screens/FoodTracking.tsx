import React, { FC, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import ProfileIcon from '../components/ProfileIcon';
import { DotMarker } from '../components/DotMarker';
import { RecessedVerticalBar } from '../components/RecessedVerticalBar';
import { connect } from 'react-redux';
import { StateAppProps, Theme, IsLoggedIn, TodaysMeal } from '../@types';
import PrimaryButton from '../components/PrimaryButton';
import RoundPrimaryButton from '../components/RoundPrimaryButton';
import { fetchAllMealsOfToday } from '../Modules/mealsDataManipulation';
import { todaysMealsSet } from '../actions/index';
import { useFocusEffect } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  useFocusEffect(
    useCallback(() => {
      fetchAllMeals();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('UserProfile')}
          style={{ marginBottom: 35, marginTop: -15 }}>
          <ProfileIcon />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <View style={{ position: 'absolute', marginTop: 10, marginLeft: 10 }}>
          <Button
            title={'Your update'}
            onPress={() => navigation.navigate('NewUpdate')}
            color={theme.palette.blueLight}
          />
        </View>
      ),
    });
  }, [navigation]);

  const generateMarkers = (): React.ReactNode => {
    return todaysMeals.map((e, index) => {
      return (
        <View key={index} style={{ alignSelf: 'center' }}>
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
            height: 70,
            paddingVertical: theme.spacing.xs,
          }}
          key={index}>
          <DotMarker></DotMarker>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: theme.spacing.xl * 6.5,
              paddingVertical: theme.spacing.s,
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
      contentContainerStyle={{
        ...styles.background,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{ flexDirection: 'row', marginLeft: 40 }}>
        <RecessedVerticalBar style={{ ...styles.verticalBar, height: todaysMeals.length * 118 }}>
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
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: theme.spacing.l,
          marginRight: theme.spacing.s,
        }}>
        <RoundPrimaryButton
          title={'+'}
          callback={() => {
            navigation.navigate('FoodDetails');
          }}
        />
      </View>
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
