import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';
import DeliveryContainer from '../component/DeliveryContainer';
import MailContainer from '../component/MailContainer';
import MyPageContainer from '../component/MyPageContainer';

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
              onSelect={this.onSelect}
            >
              <Nav.Link href="#mypage">My Page</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          (selectedTab === '#delivery') // eslint-disable-line no-nested-ternary
            ? <DeliveryContainer isMaster={false} id={userId} />
            : (selectedTab === '#mail')
              ? <MailContainer isMaster={false} id={userId} />
              : <MyPageContainer isMaster={false} id={userId} />
        }
      </Container>

    );
  }
}

StudentContainer.propTypes = {
  /* location: PropTypes.shape({
    state: PropTypes.shape({
      user: PropTypes.shape({
        StuID: PropTypes.integer.isRequired,
      }).isRequired,
    }).isRequired
  }).isRequired, */
};

export default StudentContainer;
