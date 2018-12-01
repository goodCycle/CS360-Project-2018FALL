import React, { Component } from 'react';
import { Container, Jumbotron, Nav, Row, Col, Tab, Dropdown, Button, ButtonGroup } from 'react-bootstrap';
class MailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      mailList: [],
      loaded: false,
    };
  }
  static getDerivedStateFromProps(prevProps, prevState) {
    const { id } = prevProps;
    const { userId } = prevState;

    if (userId !== id) {
      return { userId: id };
    }
    return null;
  }
  componentDidMount() {
    const getRoomMail = () => fetch(`/api/student_mail_recent/${this.state.userId}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data);
        this.setState({ mailList: responseData.data });
      })
      .catch((error) => {
        console.log('Error fetching getRoomMail', error);
      });

    return getRoomMail()
      .then(() => {
        this.setState({ loaded: true });
      });
  }
  changeState(MailID, StateNum) {
    console.log(MailID);
    const updateState = () => fetch(`/api/mail_state/${MailID}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        State: StateNum
      })
    })
      .then(() => fetch(`/api/student_mail_recent/${this.state.userId}`)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.data);
          this.setState({ mailList: responseData.data });
        })
        .catch((error) => {
          console.log('Error fetching getRoomMail', error);
        }));
    return updateState();
  }

  render() {
    const stateTitle = (mail) => {
      if (mail === 1) {
        return '미수령';
      } else if (mail === 2) {
        return '수령 완료';
      } else if (mail === 3) {
        return '반송 신청';
      }
      return '의문의 상태';
    };

    return (
      (this.state.loaded === false)
        ? <Container>Loading</Container>
        : <Container style={{ marginBottom: 100, marginTop: 20 }}>
          <Tab.Container id="left-tabs-example" defaultActiveKey="default">
            <Row>
              <Col sm={3} bg="light" expand="lg">
                {/* <Navbar bg="light" expand="lg" onSelect={this.onSelect} > */}
                <Nav variant="pills" className="flex-column" style={{ backgroundColor: '#F6F6F9', borderRadius: '5px' }}>
                  <Nav.Item style={{ color: 'white' }}>
                    <Nav.Link eventKey="default">
                      받는 이 / 배송 날짜
                    </Nav.Link>
                  </Nav.Item>
                  {
                    (this.state.mailList.map((item) => (
                      <Nav.Item key={item.MailID}>
                        <Nav.Link eventKey={item.MailID}>
                          <div>
                            {item.Receiver}
                          </div>
                          {
                            item.ArrivalDate !== null &&
                            <div>{item.ArrivalDate.split('T')[0]}</div>
                          }
                        </Nav.Link>
                      </Nav.Item>
                    )))
                  }
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="default">
                    <Jumbotron>
                      <h1>Find Your Taekbae!</h1>
                      <p>
                        당신의 방으로 온 우편을 확인할 수 있습니다.<br />
                        우편를 수령한 후에는 상태를 변경하여 주세요!
                      </p>
                    </Jumbotron>
                  </Tab.Pane>
                  {this.state.mailList.map((item) => (
                    <Tab.Pane eventKey={item.MailID}>
                      <Jumbotron>
                        <h6 style={{ fontWeight: 'bold' }}>운송장번호</h6>
                        <p>{item.MailID}</p>
                        <h6 style={{ fontWeight: 'bold' }}>배송지</h6>
                        <p>{item.Location}</p>
                        <h6 style={{ fontWeight: 'bold' }}>보낸 이</h6>
                        <p>{item.Sender}</p>
                        <h6 style={{ fontWeight: 'bold' }}>받는 이</h6>
                        <p>{item.Receiver}</p>
                        {
                          item.ArrivalDate !== null &&
                          <div>
                            <h6 style={{ fontWeight: 'bold' }}>도착 시간</h6>
                            <p>{item.ArrivalDate.split('T')[0]}<br />
                              {item.ArrivalDate.split('T')[1].split('.')[0]}</p>
                          </div>
                        }
                        {
                          item.ReceiptDate !== null &&
                          <div>
                            <h6 style={{ fontWeight: 'bold' }}>수령 시간</h6>
                            <p>{item.ReceiptDate.split('T')[0]}<br />
                              {item.ReceiptDate.split('T')[1].split('.')[0]}</p>
                          </div>
                        }
                        <h6 style={{ fontWeight: 'bold' }}>배송 상태</h6>
                        <Dropdown as={ButtonGroup}>
                          <Button variant="info">
                            {stateTitle(item.State)}
                          </Button>
                          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={this.changeState.bind(this, item.MailID, 1)}>
                              미수령
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.changeState.bind(this, item.MailID, 2)}>
                              수령 완료
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.changeState.bind(this, item.MailID, 3)}>
                              반송 신청
                            </Dropdown.Item>
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

MailContainer.propTypes = {
  //isMaster: PropTypes.bool.isRequired,
};

export default MailContainer;
