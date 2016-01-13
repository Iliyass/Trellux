import React from 'react'
import List from './List.jsx'
import ListComposer from './ListComposer.jsx'

export default ({
  lists = [{ name: 'Test', cards: [1, 2] }],
  addCardHandler,
  addedCardHandler,
  addingCardTo,
  addingListHandler,
  addingList,
  addedListHandler,
  boardClickHandler,
  showingCard,
  currentCard,
  closeCardHandler
}) => {
  return (
    <div onClick={boardClickHandler}>
      {
        lists.map((list) => (<List closeCardHandler={closeCardHandler} currentCard={currentCard} showingCard={showingCard} addedCardHandler={addedCardHandler} addCardHandler={addCardHandler} {...{list, addingCardTo}}  />) )
      }
      <ListComposer addingList={addingList} addingListHandler={addingListHandler}  addedListHandler={addedListHandler}/>
    </div>
  )
}
