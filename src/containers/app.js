import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container } from 'react-bootstrap';

export class AppContainer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <Button>Student</Button>
        <Button>Master</Button>
      </Container>
    );
  }
}

function mapStateToProperties(/* state */) {
  return { };
}

AppContainer.propTypes = {
};

export default connect(mapStateToProperties)(AppContainer);
