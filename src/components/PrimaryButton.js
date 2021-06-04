import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

const PrimaryButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={() => {
          props.callback();
        }}>
        <View
          style={{
            ...styles.button,
            backgroundColor: props.theme.colors.background,
            height: props.theme.spacing.xl,
            width: props.width || 160,
          }}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 2,
    shadowColor: 'black',
  },

  buttonContainer: {
    alignItems: 'center',
    margin: 20,
    shadowOffset: {
      width: -0.5,
      height: -0.5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowColor: 'white',
  },

  buttonText: {
    fontFamily: 'Oxygen_700Bold',
    fontWeight: '700',
    fontSize: 14,
    color: '#F8FAFC',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
  };
};

export default connect(mapStateToProps, {})(PrimaryButton);
