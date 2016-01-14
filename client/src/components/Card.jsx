import React from 'react'
import CardModal from './CardModal.jsx'
export default ({
  _id,
  name,
  desc,
  listId,
  showingCard,
  currentCard,
  closeCardHandler,
  editingCardDescHandler,
  saveCardDescHandler
}) => {
  return (
    <div className="list-card" >
        <div className="list-card-item" onClick={(e) => { console.log(e.target); showingCard(_id)} }>
          <a className="list-card-name">{name}</a>
        </div>
        <CardModal saveCardDescHandler={saveCardDescHandler} editingCardDescHandler={editingCardDescHandler} closeCardHandler={closeCardHandler} currentCard={currentCard} isOpen={currentCard.id === _id} {...{_id, name, desc, listId}}/>
    </div>
  )
}
