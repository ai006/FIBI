import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet,Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types' ;

import Options from '../Options';
import { defaultStyles } from '../styles'
import {getStyles} from '../DynamicStyle';

const { width, height } = Dimensions.get('window'); // Get screen dimensions
const defaultHeight = height * 0.67;                // Set default popup height to 67% of screen height

export default class MoviePopup extends Component {
  
  static propTypes = {
	  isOpen: PropTypes.bool.isRequired,
    movie: PropTypes.object,      // Movie object that has title, genre, poster, days and times
    onBook: PropTypes.func,       // Gets called when user books their ticket
    onClose: PropTypes.func,      // Gets called when popup closed
  }
    
  state = {
   visibleModal: false,
  };

   render() {     
    const {jobClicked, chosenDay, chosenTime, onChooseDay, onChooseTime, onBook} = this.props;
    const { CompanyName, link, logo, address,jobsArr } = jobClicked || {}; // Pull out movie data
    const {countryArr} = address || [];
    
     return (
        <Modal
          isVisible={this.props.isOpen}
          onSwipeComplete={this.props.onClose}
          swipeDirection="down"
          style={styles.bottomModal}>

          <View style={styles.container}>
            <View style={styles.scrollableModal}>
              <View style={[styles.movieContainer,getStyles.movieContainer]}>
                {/* <View style={[styles.imageContainer, getStyles.imageContainer]}>
                  <Image source={{ uri: logo }} style={styles.image} />
                </View> */}
                <View style={[styles.imageContainer, getStyles.imageContainer]}>
                  <Image source={{ uri: logo }} style={styles.image} />
                </View>
                <View style={[styles.movieInfo, getStyles.movieInfo]}>
                  <Text style={[styles.title, getStyles.title]}>{CompanyName}</Text>
                  <Text style={styles.genre}>{link}</Text>
                </View>
              </View>
              <View>
                <Text style={[styles.pushRight,styles.sectionHeader]}>Countries</Text>
                <Options
                  values={countryArr}
                  chosen={chosenDay}
                  onChoose={onChooseDay}
                />
                <Text style={[styles.pushRight,styles.sectionHeader]}>Jobs</Text>
                <Options
                  values={jobsArr}
                  chosen={chosenTime}
                  onChoose={onChooseTime}
                />
              </View>
              <View style={styles.footer}>
                <TouchableHighlight
                  underlayColor='green'
                  style={styles.buttonContainer}
                  onPress={onBook}
                >
                  <Text style={styles.button}>See more</Text>
                </TouchableHighlight>
            </View>
          </View>
          </View>  
        </Modal>
     );
   }
}
const styles = StyleSheet.create({
  // Main container
  container: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    justifyContent: 'flex-end',         // align popup at the bottom
    backgroundColor: 'transparent',     // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject,   // fill up all screen
    backgroundColor: 'black',
  },
  // Popup
  modal: {
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // Movie container
  movieContainer: {
    flex: 1,                            // take up all available space
    marginBottom: 20,
  },
  imageContainer: {
    flex: 1,                            // take up all available space
  },
  image: {
    marginLeft:10,
    borderRadius: 10,                   // rounded corners
    //...StyleSheet.absoluteFillObject,   // fill up all space in a container
    height:125,
    width:125,
    
  },
  movieInfo: {
    backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    marginLeft: 10,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 20,
  },
  genre: {
    ...defaultStyles.text,
    color: '#BBBBBB',
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: '#AAAAAA',
  },
  // Footer
  footer: {
    padding: 10,
  },
  buttonContainer: {
    backgroundColor: 'green',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    ...defaultStyles.text,
    color: '#FFFFFF',
    fontSize: 18,
  },
  containerPop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  pushRight: {
     marginLeft:10,
  },
  bottomModal: {
    
    margin:0,
  },
  scrollableModal: {
    height: defaultHeight,
    backgroundColor: 'white',
  },
  scrollableModalContent1: {
    flex:1,
    backgroundColor: '#87BBE0',
    
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 100,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});