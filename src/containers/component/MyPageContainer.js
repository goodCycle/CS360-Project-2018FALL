import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MyPageContainer extends Component {
  componentDidMount() {
    // this.getStudents();
  }

  render() {
    return (
      <Container>
        {`HI MyPage ${(this.props.isMaster) ? 'Masters' : 'Students'}`}
      </Container>

    );
  }
}

MyPageContainer.propTypes = {
  isMaster: PropTypes.bool.isRequired,
};

export default MyPageContainer;
