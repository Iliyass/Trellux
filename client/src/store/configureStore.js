import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from '../reducers'
import createLogger from 'redux-logger'

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)
  return store
}
