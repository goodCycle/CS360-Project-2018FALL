import React, { Component } from 'react';
import {
  // Container,
  Modal,
  Button,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';


class AddDeliveryMailModal extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      postNum: null,
      roomNum: null,
      receiver: null,
      sender: null,
      content: null,
      dormName: '세종관',
      validated: false,
      // user: null,
    };
  }

  onChangePostNum = (event) => {
    console.log('postNum', event.target.value);
    this.setState({ postNum: event.target.value });
  }

  onChangeRoomNum = (event) => {
    this.setState({ roomNum: event.target.value });
  }

  onChangeReceiver = (event) => {
    this.setState({ receiver: event.target.value });
  }

  onChangeSender = (event) => {
    this.setState({ sender: event.target.value });
  }

  onChangeContent = (event) => {
    this.setState({ content: event.target.value });
  }

  onSelectDorm = (event) => {
    this.setState({ dormName: event.target.value });
  }

  onClickSubmitButton = (event) => {
    const form = event.currentTarget;
    const deliveryOrMail = this.props.isDelivery ? 'delivery' : 'mail';

    if (form.checkValidity()) {
      fetch(`/api/${deliveryOrMail}`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ID: this.state.postNum,
          DormID: this.props.dormId,
          RoomNum: this.state.roomNum,
          Receiver: this.state.receiver,
          Sender: this.state.sender,
          Content: this.state.content,
          State: 1,
        })
      })
        .then(() => {
          this.setState(this.getInitialState());
          // this.setState({ id: '' });
          // this.setState({ showModal: true });
          this.props.onModalHide();
          // event.preventDefault();
        })
        .catch((error) => {
          console.log('Sign Up onClickSubmit Error', error);
        });
      event.preventDefault();
      return;
    }
    this.setState({ validated: true });
    event.preventDefault();
  }

  closeModal = () => {
    this.setState(this.getInitialState());
    // this.setState({ validated: true });
    this.props.onModalHide();
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.closeModal} >
        <Modal.Header closeButton>
          <Modal.Title>
            { this.props.isDelivery
              ? 'Add Delivery'
              : 'Add Mail'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={this.state.validated}
            onClick={e => this.onClickSubmitButton(e)}
          >
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Post Number</Form.Label>
              <Form.Control type="text" placeholder="Enter post number" required onChange={this.onChangePostNum} />
              <Form.Control.Feedback type="invalid">
                Please enter the post number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Room Number</Form.Label>
              <Form.Control type="text" placeholder="Enter Room Number" required onChange={this.onChangeRoomNum} />
              <Form.Control.Feedback type="invalid">
                Please write the room number of the { this.props.isDelivery ? 'delivery' : 'mail' }
              </Form.Control.Feedback>
            </Form.Group>
            {
              this.props.isDelivery
                ? <Form.Group controlId="exampleForm.ControlInput2">
                  <Form.Label>Content</Form.Label>
                  <Form.Control type="text" placeholder="Enter Content" required onChange={this.onChangeContent} />
                  <Form.Control.Feedback type="invalid">
                    Please enter the content of the delivery
                  </Form.Control.Feedback>
                </Form.Group>
                : null
            }
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Receiver</Form.Label>
              <Form.Control type="text" placeholder="Enter Receiver" required onChange={this.onChangeReceiver} />
              <Form.Control.Feedback type="invalid">
                Please enter the receiver of the { this.props.isDelivery ? 'delivery' : 'mail' }
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Sender</Form.Label>
              <Form.Control type="text" placeholder="Enter Sender" required onChange={this.onChangeSender} />
              <Form.Control.Feedback type="invalid">
                Please enter the sender of the { this.props.isDelivery ? 'delivery' : 'mail' }
              </Form.Control.Feedback>
            </Form.Group>
            <Row>
              <Col md={1}>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Col>
              <Col md={{ span: 3, offset: 8 }}>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}


AddDeliveryMailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onModalHide: PropTypes.func.isRequired,
  isDelivery: PropTypes.bool.isRequired,
  dormId: PropTypes.number.isRequired,
};

export default AddDeliveryMailModal;
