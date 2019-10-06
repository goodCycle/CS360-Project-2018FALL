import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';

const submitButtonStyle = {
  marginTop: 15,
};

class SignUpContainer extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      // selectedTab: '#signup',
      id: null,
      password: null,
      name: null,
      roomNum: null,
      phoneNum: null,
      dormName: '세종관',
      showModal: false,
      validated: false,
      // user: null,
    };
  }

  onChangeID = (event) => {
    this.setState({ id: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeRoomNum = (event) => {
    this.setState({ roomNum: event.target.value });
  }

  onChangePhoneNum = (event) => {
    // Preprocess phone num as integer
    const phoneNum = event.target.value.split(' ').join('');
    this.setState({ phoneNum });
  }

  onSelectDorm = (event) => {
    // Preprocess dorm name to dormID
    console.log('onSelectDorm', event.target.value);
    this.setState({ dormName: event.target.value });
  }

  onClickSubmitButton = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity()) {
      this.getDormIdFromDormName(this.state.dormName)
        .then((dormId) => {
          return fetch('/api/student', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              StuID: this.state.id,
              DormID: dormId,
              RoomNum: this.state.roomNum,
              StuName: this.state.name,
              PhoneNum: this.state.phoneNum,
              Password: this.state.password,
            })
          })
            .then(() => {
              this.setState(this.getInitialState());
              this.setState({ id: '' });
              this.setState({ showModal: true });
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

  handleClose =() => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Container>
        <Alert variant={'info'}>
          Sign Up for Master is not allowed. Please send email to cs330@gmail.com.
        </Alert>
        <Form
          noValidate
          validated={this.state.validated}
          onClick={e => this.onClickSubmitButton(e)}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Student ID" required onChange={this.onChangeID} />
            <Form.Control.Feedback type="invalid">
              Please enter your student ID.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={this.onChangePassword} />
            <Form.Control.Feedback type="invalid">
              Password should be longer than 8 digits.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" required onChange={this.onChangeName} />
            <Form.Control.Feedback type="invalid">
              Please write your real name.
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
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Room Number" required onChange={this.onChangeRoomNum} />
            <Form.Control.Feedback type="invalid">
              Please enter the room number for this semester.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Phone Number</Form.Label>
            <MaskedFormControl type="text" name="phoneNumber" required placeholder="010 1234 5678" mask="111 1111 1111" onChange={this.onChangePhoneNum} />
            <Form.Control.Feedback type="invalid">
              Please enter your phone number.
            </Form.Control.Feedback>
          </Form.Group>
          <Button style={submitButtonStyle} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Your account is created!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Go to the Sign In page and sign in with your account</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={this.props.onClickGoToSignIn}>
              Go to Sign In
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}

SignUpContainer.propTypes = {
  onClickGoToSignIn: PropTypes.func.isRequired,
};

export default SignUpContainer;
