import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import DeliveryContainer from '../component/DeliveryContainer';
import MailContainer from '../component/MailContainer';
import MyPageContainer from '../component/MyPageContainer';

class StudentContainer extends Component {
  state = {
    selectedTab: '#delivery',
    students: [],
  }
  componentDidMount() {
    this.getStudents();
  }

  onSelect= (selectedKey) => {
    this.setState({ selectedTab: selectedKey });
    console.log(selectedKey);
  }

  getStudents = () =>
    fetch('/api/students')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({ students: responseData.data.students });
        // console.log(this.state.students);
      })
      .catch((error) => {
        console.log('Error fetching getStudents', error);
      });

  render() {
    const { selectedTab } = this.state;
    return (
      <Container>
        <Navbar bg="light" expand="lg" onSelect={this.onSelect} >
          <Navbar.Brand href="#home">Find Your Taekbae!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="mr-auto"
              activeKey={this.state.selectedTab}
            >
              <Nav.Link href="#delivery">Delivery</Nav.Link>
              <Nav.Link href="#mail">Mail</Nav.Link>
            </Nav>
            <Nav
              activeKey={this.state.selectedTab}
            >
              <Nav.Link href="#mypage">My Page</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {
          (selectedTab === '#delivery') // eslint-disable-line no-nested-ternary
            ? <DeliveryContainer isMaster={false} />
            : (selectedTab === '#mail')
              ? <MailContainer isMaster={false} />
              : <MyPageContainer isMaster={false} />
        }
      </Container>

    );
  }
}

export default StudentContainer;
