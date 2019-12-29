import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
  } from "react-navigation";

import AppNavigator from './ScreenContainer'
import SplashScreen from './screens/splashScreen'


const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigator
  });
  
  export default createAppContainer(InitialNavigator);
  