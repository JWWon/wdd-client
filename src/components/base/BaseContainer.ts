import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import CoreScreen from 'src/components/base/Core';

import MapScreen from 'src/pages/Map';
import LoginScreen from 'src/pages/Login';

const AppNavigator = createBottomTabNavigator({
  map: MapScreen,
});

const SessionNavigator = createStackNavigator({
  login: LoginScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      core: CoreScreen,
      app: AppNavigator,
      session: SessionNavigator,
    },
    {
      initialRouteName: 'core',
    }
  )
);
