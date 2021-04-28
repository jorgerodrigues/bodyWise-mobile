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
    },
  });
  return (
    <View style={styles.selectableTagContainer}>
      {meals.map(
        (option): React.ReactElement => {
          return (
            <TagOptions
              tag={option}
              onPress={() => {
                props.mealTypeSet(option);
                console.log('Logging', option);
              }}
              textColor={props.theme.palette.purpleLight}
            />
          );
        }
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, { mealTypeSet })(MealTypesOptions);
