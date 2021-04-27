import React, { FC } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from '../@types';

interface AppProps {
  theme: Theme;
  primaryColor: string;
  textColor: string;
  title: string;
  onPress: () => void;
}

const SingleTag: FC<AppProps> = (props: AppProps): React.ReactElement => {
  const styles = StyleSheet.create({
    shadowContainer: {
      flexDirection: 'row',
      backgroundColor: props.primaryColor,
      alignItems: 'center',
      paddingHorizontal: 5,
      height: 30,
      borderRadius: 3,
      shadowOffset: {
        width: 1.5,
        height: 1.5,
      },
      shadowOpacity: 0.7,
      shadowRadius: 3,
      shadowColor: 'black',
    },
    tagContainer: {
      shadowOffset: {
        width: -0.5,
        height: -0.5,
      },
      shadowOpacity: 0.6,
      shadowRadius: 2,
      shadowColor: 'white',
      marginTop: 10,
      marginHorizontal: 5,
    },
    tagText: {
      fontFamily: props.theme.textVariants.bodyLight.fontFamily,
      fontSize: props.theme.textVariants.bodyLight.fontSize,
      color: props.textColor,
      marginHorizontal: 3,
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.tagContainer}>
        <View style={styles.shadowContainer}>
          <Text style={{ ...styles.tagText, marginLeft: 5 }}>x</Text>
          <Text style={styles.tagText}>{props.title ? props.title : <></>}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(SingleTag);
