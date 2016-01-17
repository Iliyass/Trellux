import React from 'react'
import List from './List.jsx'
import ListComposer from './ListComposer.jsx'
import * as $ from '../utils'

export default React.createClass({
  dragEnd: function(e) {
    const fromList = { id : this.dragged.dataset.id, position: this.dragged.dataset.position }
    const toList = { id : this.currentOver.dataset.id, position: this.currentOver.dataset.position }

    // console.log(fromList, toList);

    this.props.changePositionHandler(fromList, toList)
    this.dragged.className = this.dragged.className.replace('dragged', '')
    this.currentOver.className = this.currentOver.className.replace('dragged', '')
    this.listWrapper.className = this.listWrapper.className.replace(new RegExp('placeholder', 'g'), '')
    this.dragged.style.display = 'block'

  },
  dragStart: function(e) {
    this.dragged = $.closest(e.target, 'list-container')

    this.listWrapper = this.dragged.parentNode

    this.listWrapper.className = this.listWrapper.className.replace('placeholder', '')

    this.width  = this.dragged.offsetWidth
    this.height = this.dragged.offsetHeight

    this.listWrapper.style.height  = this.height + 'px'
    this.listWrapper.style.width   = this.width + 'px'

    e.dataTransfer.effectAllawed = 'move'

    this.dragged.className += " dragged"

    e.dataTransfer.setDragImage(this.dragged, 0, 0);

  },
  dragOver: function(e) {
    e.preventDefault()

    this.listWrapper.className += " placeholder"

    this.currentOver = $.closest(e.target, 'list-container')

    this.dragged.style.display = 'none'

    // console.log("=== DRAGGED ===", this.dragged.dataset);
    // console.log("=== DRAGGED ===", this.dragged);
    // console.log("=== CURRENT ===",this.currentOver.dataset);
    // console.log("=== CURRENT ===", this.currentOver);

    //
    // const fromList = { id : this.dragged.dataset.id,     position: this.dragged.dataset.position     }
    // const toList   = { id : this.currentOver.dataset.id, position: this.currentOver.dataset.position }
    //
    // if(this.previousOver && (this.currentOver.dataset.id === this.previousOver.dataset.id)) { return; }
    //
    // // console.log("AFTER !!", this.previousOver, fromList.id, toList.id)
    // if( (fromList.id && toList.id) && ( (fromList.id != toList.id) || (fromList.id === toList.id)) ){
    //   // console.log(fromList.position, toList.position);
    //   this.props.changePositionHandler(fromList, toList)
    //   this.previousOver = null
    // }


      // this.currentOver.parentNode.className += ' placeholder'
      // this.currentOver.parentNode.style.height = this.height + 'px'
      // this.currentOver.parentNode.style.width = this.width + 'px'
      this.previousOver = this.currentOver
//
    // if((this.previousOver) && this.currentOver != this.previousOver){
    //   console.log("========= this.currentOver != this.previousOver =========");
    //   console.log(this.previousOver);
    //   this.previousOver.parentNode.style.display = 'block'
    //   this.previousOver.parentNode.parentNode.className.replace('placeholder', '')
    //   this.previousOver.parentNode.parentNode.style.height = this.height + 'px'
    //   this.previousOver.parentNode.parentNode.style.width = this.width + 'px'
    //   return
    // }
    //
    // if( (this.currentOver.parentNode.className === 'list-container')){
    //   console.log(this.currentOver.parentNode.dataset.id)
    //   this.currentOver.parentNode.style.display = 'none'
    //   this.currentOver.parentNode.parentNode.className += ' placeholder'
    //   this.currentOver.parentNode.parentNode.style.height = this.height + 'px'
    //   this.currentOver.parentNode.parentNode.style.width = this.width + 'px'
    //   this.previousOver = this.currentOver
    //   return
    // }

  },
  render: function() {
    const { lists = [{ name: 'Test', cards: [1, 2] }],
      addCardHandler,
      addedCardHandler,
      addingCardTo,
      addingListHandler,
      addingList,
      addedListHandler,
      boardClickHandler,
      showingCard,
      currentCard,
      closeCardHandler,
      editingCardDescHandler,
      saveCardDescHandler,
      openListOptionsHanlder,
    } = this.props
    return (
        <div onClick={boardClickHandler} >
          {
            lists.map((list) => (<List dragOver={(e) => this.dragOver(e)} dragStart={(e) => this.dragStart(e)} dragEnd={(e) => this.dragEnd(e)} openListOptionsHanlder={openListOptionsHanlder} saveCardDescHandler={saveCardDescHandler} editingCardDescHandler={editingCardDescHandler} closeCardHandler={closeCardHandler} currentCard={currentCard} showingCard={showingCard} addedCardHandler={addedCardHandler} addCardHandler={addCardHandler} {...{list, addingCardTo}}  />) )
          }
          <ListComposer addingList={addingList} addingListHandler={addingListHandler}  addedListHandler={addedListHandler}/>
        </div>
    )
  }
})
