import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';

export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div style={{flex: 1}}>
        {children}
      </div>
    );
  }
}