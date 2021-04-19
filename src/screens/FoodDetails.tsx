import React, { FC } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';
import SingleLineTextInput from '../components/SingleLineTextInput';
import SingleTag from '../components/SingleTag';

interface AppProps {
  theme: Theme;
}

const FoodDetails: FC<AppProps> = (props): React.ReactElement => {
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: props.theme.colors.background,
    },
    inputLabel: {
      color: props.theme.palette.blueLight,
      ...props.theme.textVariants.body,
      alignSelf: 'center',
    },
    inputContainer: {
      marginVertical: props.theme.spacing.l,
    },
  });

  return (
    <View style={styles.containerView}>
      <View style={{ marginTop: props.theme.spacing.fromTop }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Meal Type</Text>
          <SingleLineTextInput></SingleLineTextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>What did you eat?</Text>
          <SingleLineTextInput></SingleLineTextInput>
        </View>
      </View>
      <SingleTag title={'Bacon'}></SingleTag>
      <SingleTag title={'Eggs'}></SingleTag>
      <SingleTag title={'Bananas'}></SingleTag>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(FoodDetails);
