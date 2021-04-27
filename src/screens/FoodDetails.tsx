import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';
import PrimaryButton from '../components/PrimaryButton';
import SingleTag from '../components/SingleTag';
import TagOptions from '../components/TagOptions';
import { newFoodEaten, foodEatenRemoved } from '../actions/index';

interface AppProps {
  theme: Theme;
  foodsEaten: {
    food: 'string';
    id: number;
  }[];
  newFoodEaten: (data) => { data: any; type: string };
  foodEatenRemoved: (data) => { data: any; type: string };
}

const FoodDetails: FC<AppProps> = (props): React.ReactElement => {
  const [foodEaten, setFoodEaten] = useState('');
  const [mealType, setMealType] = useState('');
  const [id, setId] = useState(0);

  const meals = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];

  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: props.theme.colors.background,
    },
    inputLabel: {
      ...props.theme.textVariants.subHeader,
      color: props.theme.palette.blueLight,
      margin: props.theme.spacing.s,
      alignSelf: 'center',
    },
    inputContainer: {
      marginVertical: props.theme.spacing.s,
    },
    textInput: {
      ...props.theme.textFields.singleLine,
      width: props.theme.textFields.singleLine.width,
      marginTop: props.theme.spacing.s,
      alignSelf: 'center',
    },
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'space-between',
      marginVertical: 5,
    },
    mealTypeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: props.theme.spacing.s,
    },
  });

  const addNewFood = (): void => {
    setId(id + 1);
    props.newFoodEaten({ food: foodEaten, id: id });
    setFoodEaten('');
  };

  const generateMealOptions = (): React.ReactNodeArray => {
    return meals.map(
      (meal): React.ReactElement => {
        return (
          <TagOptions
            tag={meal}
            onPress={() => {
              setMealType(meal);
            }}
            textColor={props.theme.palette.purpleLight}
          />
        );
      }
    );
  };

  const generateSelectedMealtype = (): React.ReactNode => {
    return (
      <>
        <SingleTag
          title={mealType}
          primaryColor={props.theme.palette.purple}
          textColor={props.theme.palette.blueLight}
          key={id * Math.random()}
          onPress={() => {
            setMealType('');
          }}
        />
      </>
    );
  };

  const renderListOfEatenFoods = (): React.ReactNode => {
    return props.foodsEaten.map(
      (e): React.ReactElement => {
        return (
          <>
            <SingleTag
              title={e.food}
              primaryColor={props.theme.palette.purple}
              textColor={props.theme.palette.blueLight}
              key={e.id}
              onPress={() => {
                props.foodEatenRemoved(e);
              }}
            />
          </>
        );
      }
    );
  };

  return (
    <View style={styles.containerView}>
      <View
        style={{
          marginTop: props.theme.spacing.fromTop,
          marginHorizontal: props.theme.spacing.xxl,
        }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Meal</Text>
          <View style={styles.tagContainer}>
            {mealType == '' ? <></> : generateSelectedMealtype()}
          </View>
          <View style={styles.mealTypeContainer}>{generateMealOptions()}</View>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <Text style={styles.inputLabel}>What did you eat?</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              value={foodEaten}
              onChangeText={(text) => setFoodEaten(text)}
              style={{
                ...styles.textInput,
                width: 0.7 * props.theme.textFields.singleLine.width,
              }}></TextInput>
            <View style={{ marginTop: props.theme.spacing.s }}>
              <PrimaryButton title={'+'} width={40} callback={addNewFood} />
            </View>
          </View>
          <View style={styles.tagContainer}>{renderListOfEatenFoods()}</View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    foodsEaten: state.foodsEaten,
  };
};

export default connect(mapStateToProps, { newFoodEaten, foodEatenRemoved })(
  FoodDetails
);
