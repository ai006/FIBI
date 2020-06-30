import {createAppContainer, } from "react-navigation";
import { createSwitchNavigator } from 'react-navigation-switch-transitioner'

import AppNavigator from './ScreenContainer'
import SplashScreen from './splashScreen'

//the container to switch from the splashscreen to the mainscreen
const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigator
  });
  
  export default createAppContainer(InitialNavigator);
  