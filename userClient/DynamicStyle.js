import {StyleSheet} from 'react-native';  
  
  
  // Dynamic styles that depend on state
  export const getStyles = {
      imageContainer: {
        maxWidth: 110,              // limit width
        marginTop: 10,
      },
      movieContainer: {
        flexDirection: 'row',       // arrange image and movie info in a row
      },
      movieInfo: {
        flex: 1,
        justifyContent: 'center',   // center vertically
      },
      title: {},
  }


