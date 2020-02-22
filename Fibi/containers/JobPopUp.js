import React, { Component } from 'react';
import {Dimensions, Image, StyleSheet,Text,TouchableOpacity, ScrollView, Platform, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types' ;

import Options from '../Options';
import { defaultStyles } from '../styles';
import ScrollViews from '../scrollViews';
// import {getStyles} from '../DynamicStyle';

const { width, height } = Dimensions.get('window'); // Get screen dimensions
//const defaultHeight = height * 0.67;                // Set default popup height to 67% of screen height

const screenDivider = Platform.OS === "ios" ? 0.75 : 0.67;
const defaultHeight = height * screenDivider;

export default class JobPopUp extends Component {
  
  static propTypes = {
	  isOpen: PropTypes.bool.isRequired,
    jobClicked: PropTypes.object,      // job object that has title, genre, poster, days and times
    onBook: PropTypes.func,       // Gets called when user books their ticket
    onClose: PropTypes.func,      // Gets called when popup closed
  }
    
  state = {
   visibleModal: false,
  };

   render() {     
    const {jobClicked, onBook} = this.props;
    const { CompanyName, link, logo, address,jobsArr } = jobClicked || {}; // Pull out job data
    const {countryArr} = address || [];
    
     return (
        <Modal
          isVisible={this.props.isOpen}
          onSwipeComplete={this.props.onClose}
          swipeDirection="down"
          style={styles.bottomModal}
          propagateSwipe={Platform.OS === "ios" ? true : null}
         >

          <View style={styles.container}>
            <View style={styles.scrollableModal}>
              <View style={styles.jobContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: logo }} style={styles.image} />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.title}>{CompanyName}</Text>
                  <Text style={styles.genre}>{link}</Text>
                </View>
              </View>
              <View>              
                <View >
                  <Text style={[styles.pushRight,styles.sectionHeader]}>Countries</Text>
                    <Options  values={countryArr} />
                  <Text style={[styles.pushRight,styles.sectionHeader]}>Jobs</Text>
                    <Options values={jobsArr}/>
                    {/* <ScrollViews  name={countryArr} group={<Text>Countries</Text>}/>
                    <ScrollViews  name={jobsArr} group={<Text>Jobs</Text>}/> */}
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
  item: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    margin: 2,
    borderColor: '#2a4944',
    borderWidth: 1,
    backgroundColor: '#d2f7f1'
 },

  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // job container
  jobContainer: {
    flex: 1,  
    flexDirection: 'row',                          // take up all available space
    // alignItems:'center', 
    //justifyContent:'center',
    
    marginBottom: 0,
  },
  imageContainer: {
    flex:1,
    maxWidth: 110,              // limit width
    marginTop: 20,              // take up all available space
    marginLeft: 10,
    alignItems:'center',
  },
  image: {
    marginLeft:10,
    borderRadius: 10,                   // rounded corners
    height:125,
    width:125,
    
  },
  //info container sets up how the info 
  //is placed next to the image during the pop up
  infoContainer: {
    flex: 1,
    backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
    alignItems:'flex-start',
    justifyContent:'center',
    marginLeft:30,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
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
});