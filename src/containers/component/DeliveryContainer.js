import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class DeliveryContainer extends Component {
  componentDidMount() {
    // this.getStudents();
  }

  render() {
    return (
      <Container>
        {`HI DELIVERY ${(this.props.isMaster) ? 'Masters' : 'Students'}`}
      </Container>

    );
  }
}

DeliveryContainer.propTypes = {
  isMaster: PropTypes.bool.isRequired,
};

export default DeliveryContainer;
