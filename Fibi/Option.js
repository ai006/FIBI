import React, { Component } from 'react';
import { StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import PropTypes from 'prop-types' ;
import { Card } from 'react-native-paper';


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
      <View style={{height: 60}}>
        <Card style={[styles.card,styles.shadow]}>
          <TouchableOpacity activeOpacity={1}>
            <View>
              <Text style={{ color:  'green' }}>
                {value}
              </Text>
            </View>
          </TouchableOpacity>
        </Card>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
 
  text: {
    ...defaultStyles.text,
  },
  card:{
    alignItems: 'center',
     borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    // height:40,
    //width:100,
    padding: 10,
    marginRight: 10, 
    backgroundColor: '#fcfcfc'
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});