import './App.css'
import store from './redux/store'
import { Provider } from 'react-redux'
import Header from './containers/Header'
import PlantComponetnt from './containers/PlantComponent'

function App() {
  return (
    <Provider store={store}>
      <Header />
      <PlantComponetnt />
    </Provider>
  )
}

export default App
