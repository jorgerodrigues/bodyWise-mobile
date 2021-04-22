import React, { FC } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';

interface AppProps {
  theme: Theme;
  width: number;
  children: React.ReactElement;
}

const SingleLineTextInput: FC<AppProps> = (props: AppProps): React.ReactElement => {
  const styles = StyleSheet.create({
    textInput: {
      ...props.theme.textFields.singleLine,
      width:
        props.theme.textFields.singleLine.width * props.width ||
        props.theme.textFields.singleLine.width,
      marginTop: props.theme.spacing.s,
      alignSelf: 'center',
    },
  });

  return (
    <>
      <TextInput style={styles.textInput}>
        {props.children ? props.children : <></>}
      </TextInput>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(SingleLineTextInput);
