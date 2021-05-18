import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';

interface AppProps {
  tag: string;
  theme: Theme;
  textColor: string;
  onPress: () => void;
}

const generateTagOptions: FC<AppProps> = (props): React.ReactElement => {
  const styles = StyleSheet.create({
    tagOptions: {
      marginHorizontal: props.theme.spacing.s,
      ...props.theme.textVariants.bodyLight,
      color: props.textColor,
      fontSize: 18,
    },
  });
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.tagOptions}>{`# ${props.tag}`}</Text>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps)(generateTagOptions);
