import React, { Component } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  TouchableHighlight,
  View,
} from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";

import Options from "../Options";
import { defaultStyles } from "../styles";
import ScrollViews from "../scrollViews";
// import {getStyles} from '../DynamicStyle';

const { width, height } = Dimensions.get("window"); // Get screen dimensions
//const defaultHeight = height * 0.67;                // Set default popup height to 67% of screen height

const screenDivider = Platform.OS === "ios" ? 0.75 : 0.67;
const defaultHeight = height * screenDivider;
// for job pops up
export default class JobPopUp extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    jobClicked: PropTypes.object, // job object that has title, genre, poster, days and times
    onBook: PropTypes.func, // Gets called when user books their ticket
    onClose: PropTypes.func, // Gets called when popup closed
  };

  state = {
    visibleModal: false,
  };

  render() {
    const { jobClicked, onBook, onClose } = this.props;
    const { CompanyName, link, logo, address, jobsArr, hireArr } =
      jobClicked || {}; // Pull out job data
    const { countryArr } = address || [];
    //console.log('in modal')
    return (
      <Modal
        isVisible={this.props.isOpen}
        onSwipeComplete={this.props.onClose}
        swipeDirection="down"
        style={styles.bottomModal}
        propagateSwipe={Platform.OS === "ios" ? true : null}
        onBackdropPress={() => this.setState(console.log("hi"))}
      >
        <View style={styles.container}>
          <View
            style={{ flexDirection: "row-reverse", marginRight: width * 0.8 }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={onClose}
            >
              <Ionicons
                name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                size={Platform.OS === "ios" ? 45 : 30}
                color={"white"}
                style={{ alignSelf: "center", marginHorizontal: 5 }}
              />
              <Text
                style={{
                  color: "white",
                  marginHorizontal: 5,
                  fontSize: 16,
                  alignSelf: "center",
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
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
            <View style={{ flex: 3 }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.pushRight, styles.sectionHeader]}>
                  Hire
                </Text>
                <Options values={hireArr} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.pushRight, styles.sectionHeader]}>
                  Jobs
                </Text>
                <Options values={jobsArr} />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.footer}>
                <TouchableHighlight
                  underlayColor="green"
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
    ...StyleSheet.absoluteFillObject, // fill up all screen
    justifyContent: "flex-end", // align popup at the bottom
    backgroundColor: "transparent", // transparent background
  },
  // Semi-transparent background below popup
  backdrop: {
    ...StyleSheet.absoluteFillObject, // fill up all screen
    backgroundColor: "black",
  },
  // Popup
  modal: {
    backgroundColor: "white",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    margin: 2,
    borderColor: "#2a4944",
    borderWidth: 1,
    backgroundColor: "#d2f7f1",
  },

  content: {
    flex: 1,
    margin: 20,
    marginBottom: 0,
  },
  // job container
  jobContainer: {
    flex: 2,
    flexDirection: "row", // take up all available space
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:'blue',
  },
  imageContainer: {
    // flex:1,
    maxWidth: 110, // limit width
    //marginTop: 20,              // take up all available space
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginLeft: 10,
    borderRadius: 10, // rounded corners
    height: 125,
    width: 125,
  },
  //info container sets up how the info
  //is placed next to the image during the pop up
  infoContainer: {
    flex: 1,
    backgroundColor: "transparent", // looks nicier when switching to/from expanded mode
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 30,
  },
  title: {
    ...defaultStyles.text,
    fontSize: 20,
  },
  genre: {
    ...defaultStyles.text,
    color: "#BBBBBB",
    fontSize: 14,
  },
  sectionHeader: {
    ...defaultStyles.text,
    color: "#AAAAAA",
  },
  // Footer
  footer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "green",
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  button: {
    ...defaultStyles.text,
    color: "#FFFFFF",
    fontSize: 18,
  },
  pushRight: {
    marginLeft: 10,
  },
  bottomModal: {
    margin: 0,
  },
  scrollableModal: {
    height: defaultHeight,
    backgroundColor: "white",
  },
});
