import React, { Component } from 'react'
import Lists from '../components/ListWrapper.jsx'
import { connect } from 'react-redux'
import { requestLists, fetchLists, fetchCards, addingCard, postCard, addingList, postList } from '../actions'

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
    console.log("------------------------------------ ADDEEDDD")
    this.dispatch(addingList())
  }
  addedListHandler (listName){
    this.dispatch(postList(listName))
  }
  render() {
    const {isFetching, lists, addingList} = this.props
    const content = (! isFetching) ? <Lists addedListHandler={(v) => this.addedListHandler(v)}
                                            addingList={addingList}
                                            addingListHandler={() => this.addingListHandler() }
                                            addedCardHandler={(id, cardContent) => this.addedCardHandler(id, cardContent) }
                                            addCardHandler={(id) => this.addingCardHandler(id)} {...this.props}  />
                                            : <h2> Loading ... </h2>
    return (
        <div id="board">
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
    addingList: state.addingList
  }
}

export default connect(mapStateToProps)(Board)
