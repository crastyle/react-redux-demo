/**
 * Created by victor on 2017/11/14.
 */
import React, {PureComponent} from 'react'
import styles from './Header.scss'
import actions from '../action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import commonActions from '../../common/action'
import { Link } from 'react-router';
import { header } from '../../../../../locale'
import { Select } from 'antd'
const Option = Select.Option
@connect(
    state => ({
        userToken: state.get('userToken'),
        carts: state.get('carts')
    }),
    dispatch => ({
		actions: bindActionCreators(actions, dispatch),
		commonActions: bindActionCreators(commonActions, dispatch)
	})
)
export default class UserInfoNavBar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultLang: 'cn'
        }
    }
    render() {
        return (
            <header className={styles.header}>
                
            </header>
        )
        
    }
}