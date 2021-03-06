import React, { Component } from 'react';
import {
  Container,
  Jumbotron,
  Nav,
  Row,
  Col,
  Tab,
  Dropdown,
  Button,
  ButtonGroup,
  Table,
  Alert,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddDeliveryMailModal from '../component/AddDeliveryMailModal';

class DeliveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      deliveryList: [],
      loaded: false,
      addModalVisible: false,
      delivIdToReceiptDate: {},
      deliveryCnt: null
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
    if (this.props.isMaster === true) {
      return this.getDormDeliv()
        .then(() => {
          console.log(this.state.deliveryList);
        })
        .then(() => {
          this.state.deliveryList.map((item) => {
            if (item.State === 2) {
              this.getReceiptDate(item.DelivID);
            }
          });
        })
        .then(() => this.setState({ loaded: true }));
    }
    return this.getRoomDeliv()
      .then(() => {
        this.state.deliveryList.map((item) => {
          if (item.State === 2) {
            this.getReceiptDate(item.DelivID);
          }
        });
      })
      .then(() => this.setState({ loaded: true }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      if (this.props.isMaster === true) {
        return this.getDormDeliv()
          .then(() => {
            console.log(this.state.deliveryList);
            this.setState({ loaded: true });
          });
      }
      return this.getRoomDeliv()
        .then(() => {
          this.setState({ loaded: true });
        });
    }
    return null;
  }

  getRoomDeliv = () => fetch(`/api/student_delivery_recent/${this.state.userId}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.data);
      this.setState({ deliveryList: responseData.data });
    })
    .catch((error) => {
      console.log('Error fetching getRoomDeliv', error);
    });

  getDormDeliv = () => fetch(`/api/master_delivery/${this.state.userId}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.data);
      this.setState({ deliveryList: responseData.data });
    })
    .then(() => fetch(`/api/master_delivery_cnt/${this.state.userId}`))
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.data);
      if (responseData.data.length > 0) {
        this.setState({ deliveryCnt: responseData.data[0].Cnt });
      }
      else {
        this.setState({ deliveryCnt: 0 });
      }
    })
    .catch((error) => {
      console.log('Error fetching getDormDeliv', error);
    });

  getReceiptDate = (delivId) => fetch(`/api/receiptdelivdate/${delivId}`)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData.data);
      // const delivIdToRD = {};
      // delivIdToRD[delivId] = responseData.data;
      this.setState({
        delivIdToReceiptDate: {
          ...this.state.delivIdToReceiptDate,
          [delivId]: responseData.data[0].ReceiptDate,
        }
      });
    })
    .catch((error) => {
      console.log('Error fetching getReceiptDate', error);
    });

  changeState = (DelivID, StateNum) => {
    this.setState({ loaded: false });
    const updateState = () => fetch(`/api/delivery_state/${DelivID}`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        State: StateNum
      })
    })
      .then(() => fetch(`/api/student_delivery_recent/${this.state.userId}`))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data);
        this.setState({ deliveryList: responseData.data });
      })
      .then(() => fetch(`/api/receiptdelivdate/${DelivID}`))
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data);
        // const delivIdToRD = {};
        // delivIdToRD[delivId] = responseData.data;
        this.setState({
          delivIdToReceiptDate: {
            ...this.state.delivIdToReceiptDate,
            [DelivID]: responseData.data[0].ReceiptDate,
          },
          loaded: true,
        });
      })
      .catch((error) => {
        console.log('Error fetching delivery_state', error);
      });

    return updateState();
  }

  deleteDeliv = (DelivID) => fetch(`/api/delete/delivery/DelivID/${DelivID}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => fetch(`/api/master_delivery/${this.state.userId}`)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData.data);
        this.setState({ deliveryList: responseData.data });
        this.props.onChangeUpdated();
      })
      .catch((error) => {
        console.log('Error fetching getRoomDeliv', error);
      }));


  openAddModal = () => {
    this.setState({ addModalVisible: true });
  }

  closeAddModal = () => {
    this.setState({ addModalVisible: false });
    this.props.onChangeUpdated();
  }

  render() {
    const stateTitle = (deliv) => {
      if (deliv === 1) {
        return 'Pending';
      } else if (deliv === 2) {
        return 'Receving Completed';
      } else if (deliv === 3) {
        return 'Return Request';
      }
      return 'Unknown';
    };

    if (this.props.isMaster === true) {
      return (
        (this.state.loaded === false)
          ? <Container>Loading</Container>
          : <Container>
            <br />
            <Row>
              <Col sm={1.5} style={{ marginLeft: 15 }}>
                <Button variant="danger" onClick={this.openAddModal}>
                  Add Delivery
                </Button>
                <AddDeliveryMailModal
                  visible={this.state.addModalVisible}
                  onModalHide={this.closeAddModal}
                  isDelivery
                  dormId={this.props.dormId}
                />
              </Col>
              <Col sm={4}>
                <Alert variant="danger">
                  There are {this.state.deliveryCnt} deliveries on your dormitory &nbsp;
                </Alert>
              </Col>
            </Row>
            <Table responsive style={{ marginBottom: 100, marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Arrived Date</th>
                  <th>Room Number</th>
                  <th>Post Number</th>
                  <th>Content</th>
                  <th>Receiver</th>
                  <th>Sender</th>
                  <th>Delivery State</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                  (this.state.deliveryList.map((item) => (
                    <tr>
                      <td>
                        {
                          item.ArrivalDate !== null &&
                          <div>
                            {item.ArrivalDate.split('T')[0]}
                          </div>
                        }
                      </td>
                      <td>
                        {item.RoomNum}
                      </td>
                      <td>
                        {item.DelivID}
                      </td>
                      <td>
                        {item.Content}
                      </td>
                      <td>
                        {item.Receiver}
                      </td>
                      <td>
                        {item.Sender}
                      </td>
                      <td>
                        {stateTitle(item.State)}
                      </td>
                      <td>
                        <Button
                          variant="outline-secondary"
                          onClick={() => this.deleteDeliv(item.DelivID)}
                        >DELETE</Button>
                      </td>
                    </tr>
                  )))
                }
              </tbody>
            </Table>
          </Container>
      );
    }
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
                      Receiver / Delivery Date
                    </Nav.Link>
                  </Nav.Item>
                  {
                    (this.state.deliveryList.map((item) => (
                      <Nav.Item key={item.DelivID}>
                        <Nav.Link eventKey={item.DelivID}>
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
                        You can check the delivery arrived to your room.<br />
                        Please change the state after you received your delivery.
                      </p>
                    </Jumbotron>
                  </Tab.Pane>
                  {this.state.deliveryList.map((item) => (
                    <Tab.Pane eventKey={item.DelivID}>
                      <Jumbotron>
                        <h6 style={{ fontWeight: 'bold' }}>Post Number</h6>
                        <p>{item.DelivID}</p>
                        <h6 style={{ fontWeight: 'bold' }}>Sender</h6>
                        <p>{item.Sender}</p>
                        <h6 style={{ fontWeight: 'bold' }}>Receiver</h6>
                        <p>{item.Receiver}</p>
                        <h6 style={{ fontWeight: 'bold' }}>Content</h6>
                        <p>{item.Content}</p>
                        {
                          item.ArrivalDate !== null &&
                          <div>
                            <h6 style={{ fontWeight: 'bold' }}>Arrival Date and Time</h6>
                            <p>{item.ArrivalDate.split('T')[0]}<br />
                              {item.ArrivalDate.split('T')[1].split('.')[0]}</p>
                          </div>
                        }
                        {
                          (this.state.loaded && item.State === 2 && (this.state.delivIdToReceiptDate[item.DelivID] !== undefined))
                            ? <div>
                              <h6 style={{ fontWeight: 'bold' }}>Received Date and Time</h6>
                              {
                                <p>{this.state.delivIdToReceiptDate[item.DelivID].split('T')[0]}{<br />}
                                  {this.state.delivIdToReceiptDate[item.DelivID].split('T')[1].split('.')[0]}</p>
                              }
                            </div>
                            : null
                        }
                        <h6 style={{ fontWeight: 'bold' }}>Delivery State</h6>
                        <Dropdown as={ButtonGroup}>
                          <Button variant="info">
                            {stateTitle(item.State)}
                          </Button>
                          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.changeState(item.DelivID, 1)}>
                              Pending
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.changeState(item.DelivID, 2)}>
                              Receiving Completed
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => this.changeState(item.DelivID, 3)}>
                              Return Request
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

DeliveryContainer.propTypes = {
  isMaster: PropTypes.bool.isRequired,
  dormId: PropTypes.number.isRequired,
  updated: PropTypes.bool,
  onChangeUpdated: PropTypes.func,
};

DeliveryContainer.defaultProps = {
  updated: false,
  onChangeUpdated: () => {},
};

export default DeliveryContainer;
