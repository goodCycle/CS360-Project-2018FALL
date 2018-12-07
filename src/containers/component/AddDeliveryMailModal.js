import React, { Component } from 'react';
import {
  // Container,
  Modal,
  Button,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const submitButtonStyle = {
  marginTop: 15,
};

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
      location: null,
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

  onChangeLocation = (event) => {
    this.setState({ locaiton: event.target.value });
  }

  onSelectDorm = (event) => {
    this.setState({ dormName: event.target.value });
  }

  onClickSubmitButton = (event) => {
    const form = event.currentTarget;
    const deliveryOrMail = this.props.isDelivery ? 'delivery' : 'mail';

    console.log('check state before submit', this.state.postNum, this.state.receiver, this.state.RoomNum);
    if (form.checkValidity()) {
      this.getDormIdFromDormName(this.state.dormName)
        .then((dormId) => {
          return fetch(`/api/${deliveryOrMail}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ID: this.state.postNum,
              DormID: dormId,
              RoomNum: this.state.roomNum,
              Receiver: this.state.receiver,
              Sender: this.state.sender,
              Content: this.state.content,
              Location: this.state.location,
              State: 1,
            })
          })
            .then(() => {
              this.setState(this.getInitialState());
              // this.setState({ id: '' });
              // this.setState({ showModal: true });
            });
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

  getDormIdFromDormName = (dormName) => {
    console.log('dormName', dormName);
    return fetch(`/api/dormitory/BuildingName/'${dormName}'`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        console.log('dormID in getDorm', responseData.data[0].DormID);
        return responseData.data[0].DormID;
        // this.setState({ students: responseData.data.students });
      })
      .catch((error) => {
        console.log('Error fetching getDormIdFromDormName', error);
      });
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onModalHide} >
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
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Dormitory</Form.Label>
              <Form.Control as="select" onChange={this.onSelectDorm}>
                <option>세종관</option>
                <option>갈릴레이관</option>
                <option>여울관</option>
                <option>나들관</option>
                <option>다솜관</option>
                <option>희망관</option>
                <option>기혼자기숙사</option>
                <option>스타트업빌리지</option>
                <option>인터네셔널빌리지C</option>
                <option>인터네셔널빌리지A</option>
                <option>인터네셔널빌리지B</option>
                <option>미르관</option>
                <option>나래관</option>
                <option>외국인교수 아파트</option>
                <option>사랑관</option>
                <option>교직원 숙소</option>
                <option>소망관</option>
                <option>성실관</option>
                <option>진리관</option>
                <option>아름관</option>
                <option>신뢰관</option>
                <option>지혜관</option>
                <option>유레카관</option>
              </Form.Control>
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
            <Form.Group controlId="exampleForm.ControlInput2">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" required onChange={this.onChangeLocation} />
              <Form.Control.Feedback type="invalid">
                Please enter the whole location of the { this.props.isDelivery ? 'delivery' : 'mail' }
              </Form.Control.Feedback>
            </Form.Group>
            <Button style={submitButtonStyle} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onModalHide}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onModalHide}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


AddDeliveryMailModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onModalHide: PropTypes.func.isRequired,
  isDelivery: PropTypes.bool.isRequired,
};

export default AddDeliveryMailModal;
