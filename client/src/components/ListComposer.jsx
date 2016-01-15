import React from 'react'


export default React.createClass({
  componentDidMount: function () {
    console.log(this.listName)
  },
  componentWillReceiveProps: function (nextProps) {
    if(nextProps.addingList){
      this.listName.focus()
    }
  },
  render: function () {
      const addingList = (this.props.addingList) ? 'mod-add' : ''
      return (
        <div className="list-wrapper">
          <div className={`list-add ${addingList}`}>
              <div className="list-add-form">
                  <span onClick={() => {this.props.addingListHandler()}}>Add a list…</span>
                  <input className="list-name-input" type="text" name="name" placeholder="Add a list…"  ref={(l) => this.listName = l}/>
                  <div className="edit-controls">
                    <input type="button" value="Save" onClick={() => {this.props.addedListHandler(this.listName.value); this.listName.value = ''; }} />
                  </div>
              </div>
          </div>
        </div>
      )
  }
})
