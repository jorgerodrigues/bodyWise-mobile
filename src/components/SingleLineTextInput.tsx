import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';

interface AppProps {
  theme: Theme;
}

const SingleLineTextInput: FC<AppProps> = (props: AppProps): React.ReactElement => {
  const styles = StyleSheet.create({
    textInput: {
      ...props.theme.textFields.singleLine,
      marginTop: props.theme.spacing.s,
      alignSelf: 'center',
    },
  });

  return (
    <>
      <TextInput style={styles.textInput}></TextInput>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(SingleLineTextInput);
