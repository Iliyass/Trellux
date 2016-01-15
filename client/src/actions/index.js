import fetch from 'isomorphic-fetch'

export const ADDING_LIST    = 'ADDING_LIST'
export const POSTED_LIST    = 'POSTED_LIST'
export const REQUEST_LISTS    = 'REQUEST_LISTS'
export const RECEIVE_LISTS    = 'RECEIVE_LISTS'
export const REQUEST_CARDS    = 'REQUEST_CARDS'
export const RECEIVE_CARDS    = 'RECEIVE_CARDS'
export const INVALIDATE_LIST  = 'INVALIDATE_LIST'
export const DELETE_LIST      = 'DELETE_LIST'

export function deleteList(listId) {
  return {
    type: DELETE_LIST,
    listId
  }
}

const DELETE_LIST_URL = "http://localhost:3000/lists/:listId"
const DELETE_REQUEST_OPTIONS = { method: 'delete',   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }

export function fetchDeleteList(listId){
  return dispatch => {
    return fetch(DELETE_LIST_URL.replace(':listId', listId), GENERATE_POST({listId}, DELETE_REQUEST_OPTIONS))
            .then(dispatch(deleteList(listId)))
  }
}

export const ADDING_CARD = 'ADDING_CARD'
export const POSTED_CARD = 'POSTED_CARD'
export const EDITING_CARD_DESC = 'EDITING_CARD_DESC'
export const SAVING_CARD_DESC  = 'SAVING_CARD_DESC'
export const SAVED_CARD_DESC  = 'SAVED_CARD_DESC'

export const REVOKE_ADDING = 'REVOKE_ADDING'

export const SHOW_CARD = 'SHOW_CARD'
export const CLOSE_CARD = 'CLOSE_CARD'

export const OPEN_ALERT_MODAL = 'OPEN_ALERT_MODAL'
export const CLOSE_ALERT_MODAL = 'CLOSE_ALERT_MODAL'

export function openAlertModal(desc, triggeredBy, item) {
  return {
    type: OPEN_ALERT_MODAL,
    desc,
    triggeredBy,
    item
  }
}

export function closeAlertModal(response, triggeredBy, item) {
  return{
    type: CLOSE_ALERT_MODAL,
    response,
    triggeredBy,
    item
  }
}


export const OPEN_LIST_POPOVER = 'OPEN_LIST_POPOVER'
export const CLOSE_LIST_POPOVER = 'CLOSE_LIST_POPOVER'

export function closeListPopover() {
  return {
    type: CLOSE_LIST_POPOVER
  }
}

export function openListPopover(popover) {
  return {
    type: OPEN_LIST_POPOVER,
    popover
  }
}

export function savedCardDesc() {
  return {
    type: SAVED_CARD_DESC
  }
}

export function savingCardDesc(card) {
  return {
    type: SAVING_CARD_DESC,
    card
  }
}

const EDIT_CARD_URL = 'http://localhost:3000/lists/:listId/cards/:cardId'

const PUT_REQUEST_OPTIONS = { method: 'put',   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }

export function postCardDesc(card) {
  return dispatch => {
    return fetch(EDIT_CARD_URL.replace(':listId', card.listId).replace(':cardId', card._id), GENERATE_POST(card, PUT_REQUEST_OPTIONS))
            .then(response => response.json())
            .then(newCard  => dispatch(savingCardDesc(newCard)) )
            .then(dispatch(savedCardDesc()))
  }
}

export function editingCardDesc(cardId) {
  return {
    type: EDITING_CARD_DESC,
    cardId
  }
}

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

const GENERATE_POST = (data, REQUEST_OPTIONS = POST_REQUEST_OPTIONS) => {
  return Object.assign({}, REQUEST_OPTIONS, {body: JSON.stringify(data) })
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

const POST_CARD_URL = 'http://localhost:3000/lists/:listId/cards'

export function postCard(listId, cardContent) {
  const card = { name: cardContent }
  return dispatch => {
    return fetch(POST_CARD_URL.replace(':listId', listId), GENERATE_POST(card))
        .then(response => response.json())
        .then(newCard => dispatch(addCard(newCard)))
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
