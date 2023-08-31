import { AppRegistry } from 'react-native'

import App from '@oap/shared/src/App'

AppRegistry.registerComponent('OAP-Form', () => App)
AppRegistry.runApplication('OAP-Form', {
  rootTag: document.getElementById('root'),
})
