import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';
import PrimaryButton from '../components/PrimaryButton';
import SingleTag from '../components/SingleTag';
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

interface FoodsEatenProp {
  food: 'string';
  id: number;
}

interface FoodsEatenArray {
  [index: string]: FoodsEatenProp;
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
      ...props.theme.textVariants.subHeaderLight,
      color: props.theme.palette.blueLight,
      alignSelf: 'center',
    },
    inputContainer: {
      marginVertical: props.theme.spacing.l,
    },
    textInput: {
      ...props.theme.textFields.singleLine,
      width: props.theme.textFields.singleLine.width,
      marginTop: props.theme.spacing.s,
      alignSelf: 'center',
    },
  });

  const addNewFood = (): void => {
    setId(id + 1);
    props.newFoodEaten({ food: foodEaten, id: id });
    setFoodEaten('');
  };

  const removeFood = (food: FoodsEatenProp): void => {
    props.foodEatenRemoved(food);
  };

  const testFunc = () => {
    console.log('Testing');
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
      <View style={{ marginTop: props.theme.spacing.fromTop }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Meal Type</Text>
          <TextInput style={{ ...styles.textInput }}></TextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>What did you eat?</Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'space-between',
              marginVertical: 5,
            }}>
            {renderListOfEatenFoods()}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              value={foodEaten}
              onChangeText={(text) => setFoodEaten(text)}
              style={{
                ...styles.textInput,
                width: 0.7 * props.theme.textFields.singleLine.width,
              }}></TextInput>
            <View style={{ marginTop: props.theme.spacing.s }}>
              <PrimaryButton title={'+'} width={50} callback={addNewFood} />
            </View>
          </View>
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
