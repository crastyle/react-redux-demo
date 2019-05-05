/**
 * Created by victor on 2017/11/14.
 */
import React, {Component} from 'react';
import styles from './Main.scss'
import actions from '../action'
import { Carousel } from 'antd'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { home } from '../../../../../locale'
import { Link } from 'react-router'
@connect(
    state => ({
    }),
    dispatch => ({actions: bindActionCreators(actions, dispatch)})
)

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    async componentDidMount() {
        this.setState({
            loading: false
		})
		
        // @param originalID
		// @param redirect_uri
        
    }

    handleNavigate(path) {
        this.props.router.push(path);
    }
    render() {
        return (
			<div className={styles.body}>
				<p style={{color: '#300'}}>Welcome react-redux-demo!!</p>
                <Link to={`login`} style={{color: '#17b'}}>Go Login</Link>
			</div>
		)
    }
}
