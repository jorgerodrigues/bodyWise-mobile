import React, { FC, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';
import PrimaryButton from '../components/PrimaryButton';
import SuccessMessage from '../components/SuccessMessage';
import SingleTag from '../components/SingleTag';
import MealsTypesOptions from '../components/MealTypesOptions';
import { newFoodEaten, foodEatenRemoved, mealTypeSet, foodEatenCleaned } from '../actions/index';
import { saveMealToCollection } from '../Modules/mealsDataManipulation';

interface AppProps {
  theme: Theme;
  foodsEaten: {
    food: 'string';
    id: number;
  }[];
  mealType: string;
  isUserLoggedIn: {
    user: {
      UserID: string;
      email: string;
      name: string;
    };
    isLogged: boolean;
  };
  todaysDate: string;
  errorOrSuccessMessage: { type: string; message: string };
  newFoodEaten: (data) => { data: any; type: string };
  foodEatenRemoved: (data) => { data: any; type: string };
  mealTypeSet: (data) => { data: any; type: string };
  foodEatenCleaned: () => { type: string };
  navigation: any;
}

const FoodDetails: FC<AppProps> = (props): React.ReactElement => {
  const [foodEaten, setFoodEaten] = useState('');
  const [id, setId] = useState(0);

  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: props.theme.colors.background,
    },
    inputLabel: {
      ...props.theme.textVariants.subHeader,
      color: props.theme.palette.blueLight,
      marginVertical: props.theme.spacing.s,
      alignSelf: 'center',
    },
    inputContainer: {
      marginVertical: props.theme.spacing.s,
    },
    textInput: {
      ...props.theme.textFields.singleLine,
      width: 0.7 * props.theme.textFields.singleLine.width,
      marginTop: props.theme.spacing.s,
      marginLeft: props.theme.spacing.s,
      alignSelf: 'center',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    mealTypeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: props.theme.spacing.s,
    },
  });

  const addNewFood = (): void => {
    setId(id + 1);
    props.newFoodEaten({ food: foodEaten.toLowerCase(), id: id });
    setFoodEaten('');
  };

  const generateSelectedMealtype = (): React.ReactNode => {
    return (
      <>
        <SingleTag
          title={props.mealType}
          primaryColor={props.theme.palette.purple}
          textColor={props.theme.palette.blueLight}
          key={id * Math.random()}
          onPress={() => {
            props.mealTypeSet('');
          }}
        />
      </>
    );
  };

  const renderListOfEatenFoods = (): React.ReactNode => {
    return props.foodsEaten.map((e): React.ReactElement => {
      return (
        <SingleTag
          title={e.food}
          primaryColor={props.theme.palette.purple}
          textColor={props.theme.palette.blueLight}
          key={id * Math.random()}
          onPress={() => {
            props.foodEatenRemoved(e);
          }}
        />
      );
    });
  };

  const saveData = async () => {
    await saveMealToCollection('Meals', {
      meal: props.mealType.toLowerCase(),
      food: props.foodsEaten,
      createdAt: props.todaysDate,
      user: props.isUserLoggedIn.user.UserID,
    });
    props.foodEatenCleaned();
    props.navigation.navigate('FoodTracking');
  };

  return (
    <View style={styles.containerView}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='position'>
          <View
            style={{
              marginTop: props.theme.spacing.fromTop,
              marginBottom: props.theme.spacing.xxl,
              marginHorizontal: props.theme.spacing.xl,
            }}>
            {props.errorOrSuccessMessage.message ? (
              <SuccessMessage message={props.errorOrSuccessMessage.message} />
            ) : (
              <></>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Meal</Text>
              <View style={styles.tagContainer}>
                {props.mealType == '' ? <></> : generateSelectedMealtype()}
              </View>
              <MealsTypesOptions />
            </View>
            <View style={{ alignSelf: 'center', width: '100%' }}>
              <Text style={styles.inputLabel}>What did you eat?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <TextInput
                  value={foodEaten}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  onChangeText={(text) => setFoodEaten(text)}
                  style={{
                    ...styles.textInput,
                  }}></TextInput>
                <View style={{ marginTop: props.theme.spacing.s }}>
                  <PrimaryButton title={'+'} width={40} callback={addNewFood} />
                </View>
              </View>
              <View style={styles.tagContainer}>{renderListOfEatenFoods()}</View>
            </View>
          </View>
          <PrimaryButton title={'Save'} callback={saveData} />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    foodsEaten: state.foodsEaten,
    mealType: state.mealType,
    todaysDate: state.todaysDate,
    isUserLoggedIn: state.isLoggedIn,
    errorOrSuccessMessage: state.errorOrSuccessMessage,
  };
};

export default connect(mapStateToProps, {
  newFoodEaten,
  foodEatenRemoved,
  mealTypeSet,
  foodEatenCleaned,
})(FoodDetails);
