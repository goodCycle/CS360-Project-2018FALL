import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class AppContainer extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <h1>Main Page</h1>
    );
  }
}

function mapStateToProperties(/* state */) {
  return { };
}

AppContainer.propTypes = {
};

export default connect(mapStateToProperties)(AppContainer);
