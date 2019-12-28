import AppNavigator from './ScreenContainer'
import SplashScreen from './screens/splashScreen'


const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: AppNavigator
  });
  
  export default createAppContainer(InitialNavigator);
  