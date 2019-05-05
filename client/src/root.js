import React, {
  Component
} from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'
import PropTypes from 'prop-types';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  }

  static childContextTypes = {
    routes: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired,
    context: PropTypes.object.isRequired
  }

  getChildContext() {
    return {routes: this.props.routes, context: this.props.context};
  }

  render() {
    const { store } = this.props
    return (
      <Provider store={store}>
        <Router 
          key={module.hot && new Date()}
          render={(props) => (<ReduxAsyncConnect {...props}/>)}
          {...this.props}
        />
      </Provider>
    )
  }
}