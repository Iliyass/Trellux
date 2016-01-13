import fetch from 'isomorphic-fetch'

export const ADDING_LIST    = 'ADDING_LIST'
export const POSTED_LIST    = 'POSTED_LIST'
export const REQUEST_LISTS    = 'REQUEST_LISTS'
export const RECEIVE_LISTS    = 'RECEIVE_LISTS'
export const REQUEST_CARDS    = 'REQUEST_CARDS'
export const RECEIVE_CARDS    = 'RECEIVE_CARDS'
export const INVALIDATE_LIST  = 'INVALIDATE_LIST'

export const ADDING_CARD = 'ADDING_CARD'
export const POSTED_CARD = 'POSTED_CARD'

export const REVOKE_ADDING = 'REVOKE_ADDING'

export const SHOW_CARD = 'SHOW_CARD'
export const CLOSE_CARD = 'CLOSE_CARD'


export function closeCard() {
  return {
    type: CLOSE_CARD
  }
}
export function showCard(cardId) {
  return {
    type: SHOW_CARD,
    cardId
  }
}

export function revokeAdding() {
  return {
    type: REVOKE_ADDING
  }
}


const POST_REQUEST_OPTIONS = { method: 'post',   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }

const GENERATE_POST = (data) => {
  return Object.assign({}, POST_REQUEST_OPTIONS, {body: JSON.stringify(data) })
}

export function addingCard(listId) {
  return {
    type: ADDING_CARD,
    listId
  }
}

export function addCard(card){
  return {
    type: POSTED_CARD,
    card
  }
}

const POST_CARD = 'http://localhost:3000/lists/:listId/cards'

export function postCard(listId, cardContent) {
  const card = { name: cardContent }
  return dispatch => {
    return fetch(POST_CARD.replace(':listId', listId), GENERATE_POST(card))
        .then(response => response.json())
        .then(card => dispatch(addCard(card)))
  }
}


const FETCH_LISTS_URL = 'http://localhost:3000/lists'
const FETCH_CARDS_URL = 'http://localhost:3000/lists/:listId/cards'
const POST_LIST = 'http://localhost:3000/lists'

export function addingList() {
  return {
    type: ADDING_LIST
  }
}

export function addList(list) {
  return {
    type: POSTED_LIST,
    list
  }
}
export function postList(listName) {
  return dispatch => {
    return fetch(POST_LIST, GENERATE_POST({name: listName}))
      .then(response => response.json())
      .then(list => { dispatch(addList(list)); return list })
      .then(list => dispatch(addingCard(list._id)))
  }
}


export function requestLists() {
  return {
    type: REQUEST_LISTS
  }
}

export function receiveLists(lists) {
  return {
    type: RECEIVE_LISTS,
    lists
  }
}

export function requestCards(listId){
  console.log("requestCards", listId)
  return {
    type: REQUEST_CARDS,
    listId
  }
}

export function receiveCards(listId, cards){
  return {
    type: RECEIVE_CARDS,
    listId,
    cards
  }
}

export function fetchCards(listId) {
  return dispatch => {
    dispatch(requestCards(listId))
    return fetch(FETCH_CARDS_URL.replace(':listId', listId))
          .then(response => response.json())
          .then(cards => dispatch(receiveCards(listId, cards)))
  }
}


export function fetchLists() {
  return dispatch => {
    dispatch(requestLists())
    return fetch(FETCH_LISTS_URL)
        .then(response => response.json())
        .then(lists => dispatch(receiveLists(lists)))
  }
}
