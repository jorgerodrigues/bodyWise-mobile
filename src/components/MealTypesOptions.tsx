import React from 'react';
import { StyleSheet, View } from 'react-native';
import TagOptions from './TagOptions';
import { connect } from 'react-redux';
import { mealTypeSet } from '../actions';

interface AppProps {
  options: [];
  callback: () => void;
}

const meals = ['Breakfast', 'Snack', 'Lunch', 'Dinner'];

const MealTypesOptions = (props): React.ReactElement => {
  const styles = StyleSheet.create({
    selectableTagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: props.theme.spacing.s,
      justifyContent: 'center',
      marginBottom: props.theme.spacing.l,
    },
  });
  return (
    <View style={styles.selectableTagContainer}>
      {meals.map((option, index): React.ReactElement => {
        return (
          <TagOptions
            key={index * Math.random()}
            tag={option}
            onPress={() => {
              props.mealTypeSet(option);
            }}
            textColor={props.theme.palette.purpleLight}
          />
        );
      })}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, { mealTypeSet })(MealTypesOptions);
