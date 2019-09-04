import React, { Component} from 'react';
import PropTypes from 'prop-types' ;
import { Animated, Dimensions, Image, LayoutAnimation, PanResponder, StyleSheet,
         Text, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';

import { defaultStyles } from './styles';
import {getStyles} from './DynamicStyle';
import Options from './Options';



const { width, height } = Dimensions.get('window'); // Get screen dimensions
const defaultHeight = height * 0.67;                // Set default popup height to 67% of screen height

export default class MoviePopup extends Component {

  static propTypes = {
	  isOpen: PropTypes.bool.isRequired,
    movie: PropTypes.object,      // Movie object that has title, genre, poster, days and times
    chosenDay: PropTypes.number,  // Index of chosen day
    chosenTime: PropTypes.number, // Index of chosem show time
    onChooseDay: PropTypes.func,  // Gets called when user chooses day
    onChooseTime: PropTypes.func, // Gets called when user chooses time
    onBook: PropTypes.func,       // Gets called when user books their ticket
    onClose: PropTypes.func,      // Gets called when popup closed
  }

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : height), // Animates slide ups and downs when popup open or closed
    opacity: new Animated.Value(0),   // Backdrop opacity
    height: defaultHeight,            // Popup height that can be changed by pulling it up or down
    expanded: false,                  // Expanded mode with bigger poster flag
    visible: this.props.isOpen,       // Visibility flag
  };

                                                        // Handle isOpen changes to either open or close popup
  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {       // isOpen prop changed to true from false
      this.animateOpen();
    }else if (this.props.isOpen && !nextProps.isOpen) { // isOpen prop changed to false from true
      this.animateClose();
    }
  }

  // Open popup
  animateOpen() {
    this.setState({ visible: true }, () => {                    // Update state first
      Animated.parallel([
      Animated.timing(                                          // Animate opacity
          this.state.opacity, { toValue: 0.65, duration: 600 }  // semi-transparent
        ),
        Animated.timing(                                        // And slide up
          this.state.position, { toValue: 0, duration: 600  }   // top of the screen
        ),
      ]).start();
    });
  }

  // Close popup
  animateClose() {
    Animated.parallel([
      Animated.timing(                                           // Animate opacity
        this.state.opacity, { toValue: 0, duration: 600}         // transparent
      ),
      Animated.timing(                                           // Slide down
        this.state.position, { toValue: height, duration: 600}   // bottom of the screen
      ),
    ]).start(() => this.setState({                               // Reset to default values
      height: defaultHeight,
      expanded: false,
      visible: false,
    }));
  }

  render() {
    const {jobClicked, chosenDay, chosenTime, onChooseDay, onChooseTime, onBook} = this.props;
    const { CompanyName, link, logo, address,jobsArr } = jobClicked || {}; // Pull out movie data
    const {countryArr} = address || [];
    if (!this.state.visible) {  // Render nothing if not visible
      return null;
    }
    return (
      <View style={styles.container}>
        {/* Closes popup if user taps on semi-transparent backdrop */}
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={[styles.backdrop, { opacity: this.state.opacity }]}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            // Animates height
            height: this.state.height,
            // Animates position on the screen
            transform: [{ translateY: this.state.position }, { translateX: 0 }]}]}>

          {/* Content */}
          <View style={styles.content}>
            {/* Movie poster, title and genre */}
            <View
              style={[styles.movieContainer, getStyles.movieContainer]}>
              {/* Poster */}
              <View style={[styles.imageContainer, getStyles.imageContainer]}>
                <Image source={{ uri: logo }} style={styles.image} />
              </View>
              {/* Title and genre */}
              <View style={[styles.movieInfo, getStyles.movieInfo]}>
                <Text style={[styles.title, getStyles.title]}>{CompanyName}</Text>
                <Text style={styles.genre}>{link}</Text>
              </View>
            </View>

            {/* Showtimes */}
            <View>
              {/* Day */}
              <Text style={styles.sectionHeader}>Countries</Text>
              {/* TODO: Add day options here */}
              <Options
                values={countryArr}
                chosen={chosenDay}
                onChoose={onChooseDay}
              />
              {/* Time */}
              <Text style={styles.sectionHeader}>Jobs</Text>
              {/* TODO: Add show time options here */}
              <Options
                values={jobsArr}
                chosen={chosenTime}
                onChoose={onChooseTime}
              />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={onBook}
            >
              <Text style={styles.button}>See more</Text>
            </TouchableHighlight>
          </View>

        </Animated.View>
      </View>
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
    borderRadius: 10,                   // rounded corners
    ...StyleSheet.absoluteFillObject,   // fill up all space in a container
  },
  movieInfo: {
    backgroundColor: 'transparent',     // looks nicier when switching to/from expanded mode
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
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#673AB7',
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
});