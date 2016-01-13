import React from 'react'

export default React.createClass({
  componentDidMount: function () {
    this.txtArea.focus()
  },
  render: function () {
      return (
        <div className="list-card-composer">
          <div className="list-card-composer-edit">
                <div className="list-card-composer-edit-container">
                    <textarea ref={(txtArea) => this.txtArea = txtArea}>
                    </textarea>
                </div>
            </div>
            <div className="list-card-add">
                <input type="submit" value="Add" className="list-card-add-input" onClick={() => this.props.addedCardHandler(this.props.listId, this.txtArea.value)} />
            </div>
        </div>
      )
  }
})
