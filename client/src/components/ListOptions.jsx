import React from 'react'
import Popover from './Popover.jsx'

export default React.createClass({
  render: function(){
    return (
      <Popover {...this.props}>
        <div className="pop-over-header">
          <span className="pop-over-header-title">List Actions</span>
          <a className="pop-over-header-close-btn" onClick={() => this.props.closeListOptionsHanlder(this.props.listId)}><i className="fa fa-times"></i></a>
        </div>
        <div className="pop-over-content">
          <ul className="pop-over-list">
            <li onClick={() => this.props.addCardHandler(this.props.listId)}><a className="js-add-card">Add Card</a></li>
            <li onClick={() => this.props.deleteListHandler(this.props.listId)}><a className="item-warning">Delete List</a></li>
          </ul>
        </div>
      </Popover>
    )
  }
})
