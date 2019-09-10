import React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import { Icon } from 'native-base';
import { Platform } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

export default class TwitterScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons
        name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
        size={25}
        color={tintColor}
      />
    )
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>coming soon!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  }
});
