import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import styles from './app.css';
import StudentsContainer from './students/StudentsContainer';

export class AppContainer extends Component {
  componentDidMount() {
    this.props.dispatch(loadApp());
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <StudentsContainer />
    );
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded
  };
}

AppContainer.propTypes = {
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProperties)(AppContainer);
