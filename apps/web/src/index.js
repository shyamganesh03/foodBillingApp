import { AppRegistry } from 'react-native'

import App from 'shared/src/App'

AppRegistry.registerComponent('IncrescoApp', () => App)
AppRegistry.runApplication('IncrescoApp', {
  rootTag: document.getElementById('root'),
})
