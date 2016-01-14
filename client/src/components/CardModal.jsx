import React from 'react'
import Modal from 'react-modal'

const CardDesriptionEdit = React.createClass({
  componentDidMount(){
    this.txtArea.focus()
    this.txtArea.setSelectionRange(this.txtArea.value.length, this.txtArea.value.length)
  },
  render: function(){
    const {_id, desc, name, listId} = this.props
    return (
              <div className="card-detail-edit edit">
                  <textarea ref={(r) => this.txtArea = r} className="field" rows="3" col="10" defaultValue={desc}></textarea>
                  <div className="edit-controls">
                    <input className="desc-save" type="button" value="Save" onClick={() => this.props.saveCardDescHandler({_id, desc: this.txtArea.value, listId})}/>
                  </div>
              </div>
            )
  }
})

const CardDescription = React.createClass({
  render: function(){
    const {_id, desc = "Edit desc", name} = this.props
    return (
            <div className="card-desc" onClick={() => this.props.editingCardDescHandler(_id)}>
              {desc}
            </div>
        )
  }
})

const customStyles = {
    overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0,0,0,.6)'
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginTop             : '150px',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#edeff0',
    borderRadius          : '3px',
    overflow              : 'hidden',
    position              : 'relative',
    width                 : '730px',
    zIndex                : 25,
    padding               : 0
  }
};


export default React.createClass({
  getInitialState: function() {
    return { modalIsOpen: this.props.isOpen };
  },
  componentWillReceiveProps(nextProps){
    this.setState({modalIsOpen: nextProps.isOpen});
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({ modalIsOpen: false});
    this.props.closeCardHandler()
  },
  render: function () {
    const {_id, desc, name, listId,  currentCard} = this.props
    const descComponent = (currentCard.id === _id && currentCard.editingDesc) ? (<CardDesriptionEdit saveCardDescHandler={this.props.saveCardDescHandler} {...{_id, desc, listId}} />) : (<CardDescription editingCardDescHandler={this.props.editingCardDescHandler} {...{_id, desc, name}} />)
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <div className="modal-header">
              <a onClick={this.closeModal} className="close"><i className="fa fa-times"></i></a>
              <h2 className="modal-title">{name}</h2>
          </div>
          <div className="modal-body">
            {descComponent}
          </div>
        </Modal>
      </div>
    )
  }
})
