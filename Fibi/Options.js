import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types' ;

import Option from './Option';
import HorizontalScroll from './horizontalScroll';
import { TouchableWithoutFeedback, TouchableHighlight } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const optionWith = (width - 0) / 3 - 10;

export default class Options extends Component {

  static propTypes = {
    // Set of values to choose from
    values: PropTypes.array,
  }

  render() {
    const { values } = this.props;
    return (
      <View style={[styles.pushRight,styles.container]}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {values.map((value, index) =>
      
            <View style={{ width: optionWith }} key={index}>
              <Option value={value}/>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2, //space between contries title and countries in cardview
    marginBottom: 10,
  },
  options: {
    flexDirection: 'row',
    marginRight: -10,
  },
  pushRight: {
    marginLeft:10,
 },
});