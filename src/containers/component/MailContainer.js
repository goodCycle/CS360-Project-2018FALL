import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MailContainer extends Component {
  componentDidMount() {
    // this.getStudents();
  }


  render() {
    return (
      <Container>
        {`HI Mail ${(this.props.isMaster) ? 'Masters' : 'Students'}`}
      </Container>

    );
  }
}

MailContainer.propTypes = {
  isMaster: PropTypes.bool.isRequired,
};

export default MailContainer;
