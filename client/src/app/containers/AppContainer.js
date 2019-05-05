import React, { Component } from 'react';
import App from '../components/App';
import PropTypes from 'prop-types';

export default class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return <App {...this.props} />;
  }
}