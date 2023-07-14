import { AppRegistry } from 'react-native'
import App from '@incresco/shared/src/App'

import { name as appName } from './app.json'

if (!__DEV__) {
  console.log = () => {}
}

AppRegistry.registerComponent(appName, () => App)
