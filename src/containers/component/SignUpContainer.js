import React, { Component } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import qs from 'qs';

class SignUpContainer extends Component {
  state = {
    // selectedTab: '#signup',
    id: null,
    password: null,
    name: null,
    roomNum: null,
    phoneNum: null,
    dormName: null,
    // user: null,
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
    this.setState({ dormName: event.target.value });
  }

  onClickSubmitButton = () => {
    event.preventDefault();

    this.getDormIdFromDormName(this.state.dormName)
      .then((dormId) => {
        /* const params = {
          StuID: this.state.id,
          DormID: dormId,
          RoomNum: this.state.roomNum,
          StuName: this.state.name,
          PhoneNum: this.state.phoneNum,
          Password: this.state.password,
        };
        return fetch(`/api/student/?${qs.stringify(params)}`); */
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
          .then((result) => {
            console.log('post result', result);
          });
      })
      .catch((error) => {
        console.log('Sign Up onClickSubmit Error', error);
      });
  }

  getDormIdFromDormName = (dormName) =>
    fetch(`/api/dormitory/BuildingName/'${dormName}'`)
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

  render() {
    return (
      <Container>
        {
          (this.state.isStudent)
            ? null
            : <Alert variant={'info'}>
              Sign Up for Master is not allowed. Please send email to cupid@gmail.com.
            </Alert>
        }
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter Student ID" onChange={this.onChangeID} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" onChange={this.onChangeName} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Dormitory</Form.Label>
            <Form.Control as="select" onChange={this.onSelectDorm}>
              <option>세종관</option>
              <option>아름관</option>
              <option>성실관</option>
              <option>신뢰관</option>
              <option>지혜관</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="text" placeholder="Enter Room Number" onChange={this.onChangeRoomNum} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Phone Number</Form.Label>
            <MaskedFormControl type="text" name="phoneNumber" placeholder="010 1234 5678" mask="111 1111 1111" onChange={this.onChangePhoneNum} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onClickSubmitButton}>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUpContainer;
