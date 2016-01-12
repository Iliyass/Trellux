require('./css/style.css')
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Board from './containers/Board.jsx'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('root')
)
