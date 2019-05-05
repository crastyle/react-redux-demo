import React, {
  PureComponent
} from 'react';
import PropTypes from 'prop-types';
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router';
import styles from './Nav.scss';

export default class Nav extends PureComponent {
  static propTypes = {
    menus: PropTypes.array.isRequired
  };

  render() {
    let { menus } = this.props

    

    return (
      <div>
        xxx
      </div>
    )
  }

  onOpen() {
    
  }

  onClose() {

  }
}

