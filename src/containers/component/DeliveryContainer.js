import React, { Component } from 'react';
import { Container, Jumbotron, Nav, Row, Col, Tab, Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DeliveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryList: [],
      test: 'sadf',
    };
  }

  componentDidMount() {
    this.getRoomDeliv();
  }

    getRoomDeliv = () =>
      fetch(`/api/student_delivery/${this.props.id}`)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.data);
          this.setState({ deliveryList: responseData.data });
        })
        .catch((error) => {
          console.log('Error fetching getRoomDeliv', error);
        });

    render() {
      const stateTitle = (deliv) => {
        if (deliv == '1') {
          return '미수령';
        } else if (deliv == '2') {
          return '수령 완료';
        } else if (deliv == '3') {
          return '반송 신청';
        }
        return '의문의 상태';
      };

      return (
        <Container style={{ marginBottom: 100, marginTop: 20 }}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="default">
            <Row>
              <Col sm={3} bg="light" expand="lg">
                {/*<Navbar bg="light" expand="lg" onSelect={this.onSelect} >*/}
                <Nav variant="pills" className="flex-column" style={{backgroundColor: '#F6F6F9', borderRadius: "5px"}}>
                  <Nav.Item style={{color: 'white'}}>
                    <Nav.Link eventKey="default">
                        받는 이 / 배송 날짜
                    </Nav.Link>
                  </Nav.Item>
                  {this.state.deliveryList.map((item) => (
                    <Nav.Item>
                      <Nav.Link eventKey={item.DelivID}>
                        <div>
                          {item.Receiver}
                        </div>
                        <div>
                          {item.ArrivalDate}
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="default">
                    <Jumbotron>
                      <h1>Find Your Taekbae!</h1>
                      <p>
                        당신의 방으로 온 택배를 확인할 수 있습니다.<br />
                        택배를 수령한 후에는 상태를 변경하여 주세요!
                      </p>
                    </Jumbotron>
                  </Tab.Pane>
                  {this.state.deliveryList.map((item) => (
                    <Tab.Pane eventKey={item.DelivID}>
                      <Jumbotron>
                        <h6 style={{ fontWeight: 'bold' }}>운송장번호</h6>
                        <p>{item.DelivID}</p>
                        <h6 style={{ fontWeight: 'bold' }}>배송지</h6>
                        <p>{item.Location}</p>
                        <h6 style={{ fontWeight: 'bold' }}>보낸 이</h6>
                        <p>{item.Sender}</p>
                        <h6 style={{ fontWeight: 'bold' }}>받는 이</h6>
                        <p>{item.Receiver}</p>
                        <h6 style={{ fontWeight: 'bold' }}>내용물</h6>
                        <p>{item.Content}</p>
                        <h6 style={{ fontWeight: 'bold' }}>도착 시간</h6>
                        <p>{item.ArrivalDate}</p>
                        <h6 style={{ fontWeight: 'bold' }}>수령 시간</h6>
                        <p>{item.ReceiptDate}</p>
                        <h6 style={{ fontWeight: 'bold' }}>배송 상태</h6>
                        <Dropdown as={ButtonGroup}>
                          <Button variant="info">
                            {stateTitle(item.State)}
                          </Button>
                          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                          <Dropdown.Menu>
                            <Dropdown.Item hred="#/action-1">미수령</Dropdown.Item>
                            <Dropdown.Item hred="#/action-2">수령 완료</Dropdown.Item>
                            <Dropdown.Item hred="#/action-3">반송 신청</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Jumbotron>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>

      );
    }
}

DeliveryContainer.propTypes = {
  isMaster: PropTypes.bool.isRequired,
};

export default DeliveryContainer;
