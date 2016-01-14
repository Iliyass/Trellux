import React, { Component } from 'react'
import Lists from '../components/ListWrapper.jsx'
import { connect } from 'react-redux'
import { requestLists, fetchLists, fetchCards,
         addingCard, postCard, addingList,
         postList, revokeAdding, showCard,
         closeCard, editingCardDesc, postCardDesc
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
  }
  addedCardHandler (listId, cardContent){
    this.dispatch(postCard(listId, cardContent))
  }
  addingListHandler (){
    this.dispatch(addingList())
  }
  addedListHandler (listName){
    this.dispatch(postList(listName))
  }
  boardClickHandler(e){
    if(e.target === this.boardNode){
      this.dispatch(revokeAdding())
    }
  }
  closeCardHandler(){
    this.dispatch(closeCard())
  }
  showingCard (cardId){
    this.dispatch(showCard(cardId))
  }
  editingCardDescHandler(cardId){
    this.dispatch(editingCardDesc(cardId))
  }
  saveCardDescHandler(card){
    console.log("saveCardDescHandler", card);
    this.dispatch(postCardDesc(card))
  }
  render() {
    const {isFetching, lists, addingList, currentCard} = this.props
    const content = (! isFetching) ? <Lists saveCardDescHandler={(card) => this.saveCardDescHandler(card) }
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
    currentCard: state.currentCard
  }
}

export default connect(mapStateToProps)(Board)
