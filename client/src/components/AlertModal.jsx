import React from 'react'
import Modal from 'react-modal'

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
    background            : '#fff',
    borderRadius          : '3px',
    overflow              : 'hidden',
    position              : 'relative',
    zIndex                : 25,
    padding               : 0,
    borderRadius          : '3px',
    border                : '1px solid #d6dadc',
    borderBottomColor     : '#c4c9cc',
    boxShadow             : '0 1px 6px rgba(0,0,0,.15)',
    overflow              : 'hidden',
    width                 : '300px',
    transition            : 'all .2s ease-in-out'
  }
};


export default React.createClass({
  getInitialState: function() {
    return { modalIsOpen: this.props.status === 'open' };
  },
  componentWillReceiveProps(nextProps){
    this.setState({modalIsOpen: nextProps.status === 'open'});
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function(response = null) {
    if(response != null){
      this.setState({modalIsOpen: false});
      this.props.alertResponseHandler(response, this.props.triggeredBy, this.props.item)
    }
    else{
      this.modal.parentNode.className += ' grow'
      setTimeout( () => {
        this.modal.parentNode.className = this.modal.parentNode.className.replace('grow', '')
      }, 100)
    }
  },
  render: function () {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={customStyles}>

        <div className="modal-header" ref={(r) => this.modal = r}>
            <h2 className="modal-title">Alert !</h2>
        </div>
        <div className="modal-body">
          {this.props.desc}
          <div className="alert-options">
            <input className="btn success" value="Yes!" type="button" onClick={() => {this.closeModal(true) }} />
            <input className="btn warning" value="No!" type="button" onClick={() => {this.closeModal(false) }} />
          </div>
        </div>
      </Modal>
    )
  }
})
