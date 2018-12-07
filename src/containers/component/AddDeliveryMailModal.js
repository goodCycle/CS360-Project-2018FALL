import React, { Component } from 'react';
import {
  // Container,
  Modal,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

/* class AddDeliveryMailModal extends Component {
  render() { */
const AddDeliveryMailModal = (props) => (
  <Modal show={props.visible} onHide={props.onModalHide} >
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>Woohoo, you&#39;re reading this text in a modal!</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onModalHide}>
        Close
      </Button>
      <Button variant="primary" onClick={props.onModalHide}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
);


AddDeliveryMailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onModalHide: PropTypes.func.isRequired,
  isDeliveryModal: PropTypes.bool.isRequired,
};

export default AddDeliveryMailModal;
