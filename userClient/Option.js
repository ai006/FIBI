import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import PropTypes from 'prop-types' ;

import { defaultStyles } from './styles';

// Colors for smooth transition when user chosess an option
const colorSelected = 'rgba(103,58,183, 1)';        // purple

export default class Options extends Component {

  static propTypes = {
    // Value to display
    value: PropTypes.string.isRequired,
  }

  render() {
    const {value} = this.props;
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.container}>
          <Text style={{ color:  colorSelected }}>
            {value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: colorSelected,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  text: {
    ...defaultStyles.text,
  }
});