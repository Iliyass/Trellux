import React from 'react'

export default React.createClass({
  render: function(){
    const { position, status } = this.props
    const isShown = (status === 'open') ? 'is-shown' : ''
    return (
      <div className={`pop-over ${isShown}`} style={position}>
        {this.props.children}
      </div>
    )
  }
})
