import React, {
    PureComponent
} from 'react';
import Header from './Header'
import Footer from './Footer'
import styles from './Landing.scss'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import actions from '../action';

@connect(
    state => ({
        userToken: state.get('userToken')
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch),
    })
)
export default class Landing extends PureComponent {
    constructor(props) {
        super(props)
    }

    async componentWillMount() {
        
    }
    render() {
        const {children} = this.props;
        const header = <Header {...this.props}/>;
        const footer = <Footer/>;
        return (
            <div className={styles.container}>
                {header}
                { children }
                {footer}
            </div>
        )
    }
}