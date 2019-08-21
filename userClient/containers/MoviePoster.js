import React, { Component } from 'react';
import PropTypes from 'prop-types' 
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { defaultStyles } from '../styles';

// Get screen dimensions
const { width, height } = Dimensions.get('window');
// How many posters we want to have in each row and column
const cols = 3, rows = 3;

export default class MoviePoster extends Component {

  static propTypes = {
    job: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired,
  }

  render() {
     const { job, job: { CompanyName, link, logo }, onOpen } = this.props;
    return (
        <TouchableOpacity style={styles.container} onPress={() => onOpen(job)}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: logo }} style={styles.image} />
            </View>
            <Text style={styles.title} numberOfLines={1}>{CompanyName}</Text>
            <Text style={styles.genre} numberOfLines={1}>{link}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginBottom: 10,
    height: (height - 20 - 20) / rows - 10,
    width: (width - 10) / cols - 10,
  },
  imageContainer: {
    flex: 1,                          // take up all available space
  },
  image: {
    borderRadius: 10,                 // rounded corners
    ...StyleSheet.absoluteFillObject, // fill up all space in a container
  },
  title: {
    ...defaultStyles.text,
    fontSize: 14,
    marginTop: 4,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 12,
    lineHeight: 14,
  },
});