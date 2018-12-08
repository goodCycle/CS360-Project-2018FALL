import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';
import DeliveryContainer from '../component/DeliveryContainer';
import MailContainer from '../component/MailContainer';

class StudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '#delivery',
      students: [],
      /* eslint-disable-next-line react/prop-types */
      userId: this.props.location.state.user.StuID,
    };
  }

  onSelect= (selectedKey) => {
    this.setState({ selectedTab: selectedKey });
    console.log(selectedKey);
  }

  onClickLogout = () => {
    this.props.history.push({ pathname: '/' });
  }

  render() {
    const { selectedTab, userId } = this.state;
    return (
      <Container>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Find Your Taekbae!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              activeKey={selectedTab}
              onSelect={this.onSelect}
            >
              <Nav.Link href="#delivery">Delivery</Nav.Link>
              <Nav.Link href="#mail">Mail</Nav.Link>
            </Nav>
            <Nav
              activeKey={selectedTab}
              onSelect={this.onClickLogout}
            >
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          (selectedTab === '#delivery') // eslint-disable-line no-nested-ternary
            ? <DeliveryContainer isMaster={false} id={userId} />
            : <MailContainer isMaster={false} id={userId} />
        }
      </Container>

    );
  }
}

StudentContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default StudentContainer;
