import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

const PrimaryButton = (props) => {
  const styles = StyleSheet.create({
    button: {
      justifyContent: 'center',
      borderRadius: 50,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: 'black',
      backgroundColor: props.theme.palette.blueLight,
      height: props.theme.spacing.xxl,
      width: props.theme.spacing.xxl,
    },

    buttonContainer: {
      alignItems: 'center',
      margin: 20,
      shadowOffset: {
        width: -0.5,
        height: -0.5,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowColor: 'white',
    },

    buttonText: {
      fontFamily: 'Oxygen_700Bold',
      fontWeight: '700',
      fontSize: 28,
      color: props.theme.palette.purple,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          props.callback();
        }}>
        <View
          style={{
            ...styles.button,
          }}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(PrimaryButton);
