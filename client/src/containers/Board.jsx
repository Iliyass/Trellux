import React, { Component } from 'react'
import Lists from '../components/ListWrapper.jsx'
import ListOptions from '../components/ListOptions.jsx'
import AlertModal from '../components/AlertModal.jsx'
import { connect } from 'react-redux'
import { requestLists, fetchLists, fetchCards,
         addingCard, postCard, addingList,
         postList, revokeAdding, showCard,
         closeCard, editingCardDesc, postCardDesc,
         openListPopover, closeListPopover, openAlertModal,
         closeAlertModal, DELETE_LIST, fetchDeleteList
        } from '../actions'

class Board extends Component{
  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }
  componentDidMount(){
    this.dispatch(fetchLists())
      .then(() => {
          this.props.lists.forEach( (l) => {
            this.dispatch(fetchCards(l._id))
          })
      })
  }
  addingCardHandler (listId) {
    this.dispatch(addingCard(listId))
    this.dispatch(closeListPopover())
  }
  addedCardHandler (listId, cardContent){
    this.dispatch(postCard(listId, cardContent))
    this.dispatch(closeListPopover())
  }
  addingListHandler (){
    this.dispatch(addingList())
    this.dispatch(closeListPopover())
  }
  addedListHandler (listName){
    this.dispatch(postList(listName))
  }
  boardClickHandler(e){
    if(e.target === this.boardNode){
      this.dispatch(revokeAdding())
      this.dispatch(closeListPopover())

    }
  }
  closeCardHandler(){
    this.dispatch(closeCard())
  }
  showingCard (cardId){
    this.dispatch(showCard(cardId))
    this.dispatch(closeListPopover())

  }
  editingCardDescHandler(cardId){
    this.dispatch(editingCardDesc(cardId))
  }
  saveCardDescHandler(card){
    this.dispatch(postCardDesc(card))
  }
  openListOptionsHanlder({clientY, clientX}, listId){
    if(listId === this.props.listPopover.listId){
      if(this.props.listPopover.status === "close"){
        this.dispatch(openListPopover({ position : { top : clientY + 20, left: clientX}, listId }))
      }
      else {
        this.dispatch(closeListPopover())
      }
    }else{
      this.dispatch(closeListPopover())
      this.dispatch(openListPopover({ position : { top : clientY + 20, left: clientX}, listId }))
    }
  }
  deleteListHandler(listId){
    this.dispatch(openAlertModal("Are you sure ?", DELETE_LIST, listId))
  }
  closeAlertHandler(res, triggeredBy, item){
    this.dispatch(closeAlertModal(res, triggeredBy, item))
    if(triggeredBy === DELETE_LIST && res){
      this.dispatch(fetchDeleteList(item))
    }
    this.dispatch(closeListPopover())
  }
  render() {
    const {isFetching, lists, addingList, currentCard, listPopover, alertModal} = this.props
    const content = (! isFetching) ? <Lists openListOptionsHanlder={(e, id) => this.openListOptionsHanlder(e, id)}
                                            saveCardDescHandler={(card) => this.saveCardDescHandler(card) }
                                            editingCardDescHandler={(id) => {this.editingCardDescHandler(id)}}
                                            closeCardHandler={() => this.closeCardHandler() }
                                            showingCard={(id) => this.showingCard(id)}
                                            addedListHandler={(v) => this.addedListHandler(v)}
                                            addingList={addingList}
                                            addingListHandler={() => this.addingListHandler() }
                                            addedCardHandler={(id, cardContent) => this.addedCardHandler(id, cardContent) }
                                            addCardHandler={(id) => this.addingCardHandler(id)} {...this.props}  />
                                            : <h2> Loading ... </h2>
    return (
        <div id="board" onClick={(e) => this.boardClickHandler(e) } ref={(r) => this.boardNode = r}>
          { content }
          <ListOptions {...listPopover} deleteListHandler={(listId) => this.deleteListHandler(listId)} addCardHandler={(listId) => this.addingCardHandler(listId)} closeListOptionsHanlder={(listId) => this.openListOptionsHanlder({}, listId)} />
          <AlertModal {...alertModal}  alertResponseHandler={(res, triggeredBy, item) => {this.closeAlertHandler(res, triggeredBy, item)}}/>
        </div>
    )
  }
}

function mapStateToProps(state){
  let {isFetching, items} = state.lists

  items = items.map( l => {
    const list = state.cards.filter( card => card.listId === l._id )[0]
    if(list){
      l.cards = list.items
    }
    return l
  })

  return {
    isFetching,
    lists: items,
    addingCardTo: state.addingCardTo,
    addingList: state.addingList,
    currentCard: state.currentCard,
    listPopover: state.listPopover,
    alertModal: state.alertModal
  }
}

export default connect(mapStateToProps)(Board)
