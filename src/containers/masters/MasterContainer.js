import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';
import DeliveryContainer from '../component/DeliveryContainer';
import MailContainer from '../component/MailContainer';

class MasterContainer extends Component {
  state = {
    selectedTab: '#delivery',
    students: [],
    /* eslint-disable-next-line react/prop-types */
    userId: this.props.location.state.user.MastID,
    /* eslint-disable-next-line react/prop-types */
    userDormId: this.props.location.state.user.DormID,
    updated: false,
  }
  componentDidMount() {
  }

  onSelect = (selectedKey) => {
    this.setState({ selectedTab: selectedKey });
  }

  onClickLogout = () => {
    this.props.history.push({ pathname: '/' });
  }

  onChangeUpdated = () => {
    if (this.state.updated) {
      this.setState({ updated: false });
    }
    this.setState({ updated: true });
  }

  render() {
    const { selectedTab, userId, userDormId } = this.state;
    return (
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
              <Nav.Link href="#delivery">Delivery</Nav.Link>
              <Nav.Link href="#mail">Mail</Nav.Link>
            </Nav>
            <Nav
              activeKey={this.state.selectedTab}
              onSelect={this.onClickLogout}
            >
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          (selectedTab === '#delivery') // eslint-disable-line no-nested-ternary
            ? <DeliveryContainer
              isMaster
              id={userId}
              dormId={userDormId}
              updated={this.state.updated}
              onChangeUpdated={this.onChangeUpdated}
            />
            : <MailContainer
              isMaster
              id={userId}
              dormId={userDormId}
              updated={this.state.updated}
              onChangeUpdated={this.onChangeUpdated}
            />
        }
      </Container>

    );
  }
}

MasterContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MasterContainer;
