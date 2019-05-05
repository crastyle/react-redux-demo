import React, {
  Component
} from 'react';
import Landing from '../components/Landing';
import PropTypes from 'prop-types';

export default class LandingContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return <Landing {...this.props} />;
  }
}