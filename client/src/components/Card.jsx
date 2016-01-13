import React from 'react'
import CardModal from './CardModal.jsx'
export default ({
  _id,
  name,
  desc,
  showingCard,
  currentCard,
  closeCardHandler
}) => {
  return (
    <div className="list-card" >
        <div className="list-card-item" onClick={(e) => { console.log(e.target); showingCard(_id)} }>
          <a className="list-card-name">{name}</a>
        </div>
        <CardModal closeCardHandler={closeCardHandler} isOpen={currentCard} {...{_id, name, desc}}/>
    </div>
  )
}
