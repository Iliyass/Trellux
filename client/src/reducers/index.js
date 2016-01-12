import { combineReducers } from 'redux'
import {
  REQUEST_LISTS, RECEIVE_LISTS,
  REQUEST_CARDS, RECEIVE_CARDS,
  ADDING_CARD, POSTED_CARD,
  ADDING_LIST, POSTED_LIST
} from '../actions'

function lists(state = {
        isFetching: false,
        didInvalidate: false,
        items: []
      }, action  ) {
    switch (action.type) {
      case REQUEST_LISTS:
        return Object.assign({}, state, {
                    isFetching: true,
                    didInvalidate: true })
      case RECEIVE_LISTS:
        return Object.assign({}, state, {
                  isFetching: false,
                  didInvalidate: false,
                  items: action.lists
        })
      case POSTED_LIST:
        return Object.assign({}, state, {
                  isFetching: false,
                  didInvalidate: false,
                  items: state.items.concat([action.list])
        })
      default:
        return state
    }
}

function cards(state = [], action) {
  switch (action.type) {
    case REQUEST_CARDS:
      return state.concat([{
        isFetching: true,
        didInvalidate: false,
        listId: action.listId,
        items: []
      }])
    case RECEIVE_CARDS:
      return state.map( (card) => {
          if(card.listId === action.listId){
            card = Object.assign({}, card, {isFetching: false, didInvalidate: false, items: action.cards })
          }
          return card
      })
    case POSTED_CARD:
      return state.map( (card) => {
          if(card.listId === action.card.listId){
            card.items = card.items.concat([action.card])
          }
          return card
      })
    default:
      return state
  }
}

function add_cards(state = null, action) {
  switch (action.type) {
    case ADDING_CARD:
      return action.listId
    case POSTED_CARD:
      return null
    default:
      return state
  }
}

function addingList(state = false, action) {
  switch (action.type) {
    case ADDING_LIST:
      return true
    case POSTED_LIST:
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
  lists,
  cards,
  addingCardTo: add_cards,
  addingList
})

export default rootReducer
