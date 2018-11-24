import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import qs from 'qs';

export class AppContainer extends Component {
  state = {
    isStudent: true,
    email: null,
    password: null,
  }

  componentDidMount() {
  }

  onChangeStudentRadio = (event) => {
    console.log('student checked!', event.target.checked);
    this.setState({ isStudent: event.target.checked });
  }

  onChangeMasterRadio = (event) => {
    console.log('master checked!', event.target.checked);
    this.setState({ isStudent: !event.target.checked });
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onClickSubmitButton = () => {
    this.setState({ logining: true });
    const params = {
      email: this.state.email,
      password: this.state.password,
    };
    return fetch(`/api/login?${qs.stringify(params)}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({ students: responseData.data.students });
        // console.log(this.state.students);
      })
      .catch((error) => {
        console.log('Error fetching getStudents', error);
      });
  }

  renderLogin = () => {
    return (
      <Form>
        <div key={'select-type'} className="mb-3">
          <Form.Check
            checked={this.state.isStudent}
            onChange={this.onChangeStudentRadio}
            custom
            inline
            label="Student"
            type={'radio'}
            id={'radio-student'}
          />
          <Form.Check
            checked={!this.state.isStudent}
            onChange={this.onChangeMasterRadio}
            custom
            inline
            label="Master"
            type={'radio'}
            id={'radio-master'}
          />
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.onChangeEmail} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={this.onChangePassword} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.onClickSubmitButton}>
          Submit
        </Button>
      </Form>
    );
  }
  render() {
    return (
      <Container>
        <Link to="/students"><Button>Student</Button></Link>
        <Link to="/masters"><Button>Master</Button></Link>
        {this.renderLogin()}
      </Container>
    );
  }
}

function mapStateToProperties(/* state */) {
  return { };
}

AppContainer.propTypes = {
};

export default connect(mapStateToProperties)(AppContainer);
