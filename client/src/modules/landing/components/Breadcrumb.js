import React, {
  PureComponent
} from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import _ from 'ramda'
import { Link } from 'react-router'
import styles from './Breadcrumb.scss'
import normalize from 'normalize-path'
@connect(
  state => ({
    rt: state.get('routing').get('locationBeforeTransitions').get('pathname')
  })
)
export default class Breadcrumb extends PureComponent { 

  render() {
    const { router: { routes } } = this.props

    const getItems = _.compose(
      _.uniqBy(r => r.title),
      _.map(r => ({ to: r.path, title: r.meta.breadcrumb})), 
      _.filter(r => r.meta && r.meta.breadcrumb)
    )

    let p = ''
    const refinedItems = getItems(routes)
      .map(r => {
        p += r.to === '/' ? r.to : '/' + r.to
        return <BC.Item key={r.title}><Link to={normalize(p)}>{ r.title }</Link></BC.Item>
      })
    
    return <div className={ styles.breadcrumb_container } separator="/">
      xxx
    </div>
  }
}