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
  addedListHandler
}) => {
  return (
    <div>
      {
        lists.map((list) => (<List addedCardHandler={addedCardHandler} addCardHandler={addCardHandler} {...{list, addingCardTo}}  />) )
      }
      <ListComposer addingList={addingList} addingListHandler={addingListHandler}  addedListHandler={addedListHandler}/>)
    </div>
  )
}
