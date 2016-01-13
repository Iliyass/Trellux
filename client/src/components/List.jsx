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
  closeCardHandler
}) => {
  const { _id, name = 'Name', cards = [] } = list
  console.log("List addingCardTo", (addingCardTo === _id))
  const cardComposer = (addingCardTo === _id) ? (<CardComposer listId={_id} addedCardHandler={addedCardHandler} />) : ''
  return (
    <div className="list-wrapper">
    	<div className="list-container">
    		<div className="list-name">
    			<h2 className="list-name-text">
    				{name}
    			</h2>
    		</div>

    		<div className="list-cards-container">
          {
            cards.map( c => (<Card closeCardHandler={closeCardHandler} currentCard={currentCard === c._id} showingCard={showingCard} {...c}  />))
          }

          {cardComposer}
    		</div>
        <a className="list-add-card" onClick={() => addCardHandler(_id)}>Add a card</a>
    	</div>
    </div>
  )
}
