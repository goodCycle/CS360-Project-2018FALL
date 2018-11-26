import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container, Form, Navbar, Nav, Alert } from 'react-bootstrap';
import qs from 'qs';
import SignUpContainer from './component/SignUpContainer';

export class AppContainer extends Component {
  state = {
    selectedTab: '#signin',
    isStudent: true,
    id: null,
    password: null,
    user: null,
  }

  componentDidMount() {
  }

  onSelect= (selectedKey) => {
    this.setState({ selectedTab: selectedKey });
    console.log(selectedKey);
  }

  onChangeStudentRadio = (event) => {
    this.setState({ isStudent: event.target.checked });
  }

  onChangeMasterRadio = (event) => {
    this.setState({ isStudent: !event.target.checked });
  }

  onChangeID = (event) => {
    this.setState({ id: event.target.value });
  }

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  }

  onClickSubmitButton = (event) => {
    event.preventDefault();

    this.setState({ logining: true });
    const params = {
      id: this.state.id,
      password: this.state.password,
    };
    const studentOrMaster =
      (this.state.isStudent)
        ? 'student'
        : 'master';
    return fetch(`/api/login/${studentOrMaster}?${qs.stringify(params)}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.error != null) {
          this.setState({ error: new Error(responseData.error.message) });
          return;
        }
        const { user } = responseData.data;
        this.setState({ user });
        if (user == null) {
          console.log('Login Failed');
          this.setState({ error: new Error('Please check your ID or Password!') });
          return;
        }
        this.setState({ error: null });
        if (user.StuID != null) {
          this.props.history.push({ pathname: '/students', state: { user: this.state.user } });
          return;
        }
        this.props.history.push({ pathname: '/masters', state: { user: this.state.user } });
      })
      .catch((error) => {
        console.log('onClickSubmit error', error);
        this.setState({ error });
      });
  }

  renderLogin = () => (
    <Form>
      <div key={this.state.selectedTab} className="mb-3">
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
        <Form.Label>ID</Form.Label>
        <Form.Control type="text" placeholder="Enter ID" onChange={this.onChangeID} />
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

  renderError = () => (
    <Alert variant="warning">
      {this.state.error.message}
    </Alert>
  );

  render = () => (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Find Your Taekbae!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="mr-auto"
            activeKey={this.state.selectedTab}
            onSelect={this.onSelect}
          >
            <Nav.Link href="#signin">Sign In</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <p>&nbsp;</p>
      {
        (this.state.error != null)
          ? this.renderError()
          : null
      }
      {
        (this.state.selectedTab === '#signin') // eslint-disable-line no-nested-ternary
          ? this.renderLogin()
          : <SignUpContainer />
      }
    </Container>
  );
}

function mapStateToProperties(/* state */) {
  return { };
}

AppContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProperties)(AppContainer);
