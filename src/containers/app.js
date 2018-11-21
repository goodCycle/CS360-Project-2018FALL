import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class AppContainer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Container>
        <Link to="/students"><Button>Student</Button></Link>
        <Link to="/masters"><Button>Master</Button></Link>
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
