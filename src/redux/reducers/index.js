import { combineReducers } from 'redux'
import { plantReducer } from './plantReducer'

const reducers = combineReducers({
  plant: plantReducer,
})

export default reducers
