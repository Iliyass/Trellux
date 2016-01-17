import React from 'react'
import Card from './Card.jsx'
import CardComposer from './CardComposer.jsx'
export default ({
  list,
  addCardHandler,
  addedCardHandler,
  addingCardTo,
  showingCard,
  currentCard,
  closeCardHandler,
  editingCardDescHandler,
  saveCardDescHandler,
  openListOptionsHanlder,
  dragEnd,
  dragStart,
  dragOver
}) => {
  const { _id, name = 'Name', position, cards = [] } = list
  console.log("List addingCardTo", (addingCardTo === _id))
  const cardComposer = (addingCardTo === _id) ? (<CardComposer listId={_id} addedCardHandler={addedCardHandler} />) : ''
  return (
    <div className="list-wrapper">
    	<div className="list-container" draggable="true" data-position={position} data-id={_id} onDragOver={dragOver} onDragEnd={dragEnd} onDragStart={dragStart}>
    		<div className="list-name">
    			<h2 className="list-name-text">
    				{name}
    			</h2>
          <a className="list-header-menu-icon" onMouseUp={(e) => openListOptionsHanlder(e, _id)}><i className="fa fa-chevron-circle-down"></i></a>
    		</div>

    		<div className="list-cards-container">
          {
            cards.map( c => (<Card saveCardDescHandler={saveCardDescHandler} editingCardDescHandler={editingCardDescHandler} closeCardHandler={closeCardHandler} currentCard={currentCard} showingCard={showingCard} {...c}  />))
          }

          {cardComposer}
    		</div>
        <a className="list-add-card" onClick={() => addCardHandler(_id)}>Add a card</a>
    	</div>
    </div>
  )
}
