import {Platform, StyleSheet} from 'react-native';

export const defaultStyles = {
    text: {
      fontFamily:Platform.OS === 'ios'? 'Avenir': 'serif',
    }
};