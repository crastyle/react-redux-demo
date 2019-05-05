import React, {Component} from 'react'
import {createForm} from 'rc-form';
import styles from './Login.scss'
import actions from '../action'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { Link } from 'react-router'
import { login } from '../../../../../locale'
import { Button, Input, Alert, message } from 'antd'
@connect(
    state => ({
			userToken: state.get('user')
    }),
    dispatch => ({actions: bindActionCreators(actions, dispatch)})
)
class Login extends Component {
    constructor(props) {
			super(props);
			this.state = {
				form: {
					clientno: '',
					pass: ''
				},
				showError: false
			}
    }
    async handleSubmit() {
			await this.props.actions.login(this.state.form)
    }
    async componentWillMount() {
        console.log(this.props.userToken)
		}
		onChange(k, e) {
			this.setState({
				form: Object.assign(this.state.form, {[k]: e.target.value}),
				showError: false
			})
		}
    render() {
        
        return (
            <div className={styles.main}>
							<h1 className={styles.page_title}>
								{ login.title }
							</h1>
							
							
							
						<div className={styles.formLogin}>
							<form>
								<div className={styles.group}>
									<input type="text" onChange={this.onChange.bind(this, 'clientno')} value={this.state.form.clientno} placeholder={login.account} />
								</div>
								<div className={styles.group}>
									<input type="password" onChange={this.onChange.bind(this, 'pass')} value={this.state.form.pass} placeholder={login.password} />
								</div>

								{
									!this.props.userToken.get('isSuccess') ? (
										<div className={styles.group}>
											<Alert message={this.props.userToken.get('message')} showIcon type="error" />
										</div>
									) : null
								}
								
								<div className={styles.group}>
									<button type="button" onClick={this.handleSubmit.bind(this)}>
										{ login.loginBtn }
									</button>
									<div className={styles.group_right}>
										<span>
												{login.newAccount}
												<Link to="/register">
													{ login.createAccount }
												</Link>
										</span>
										<span>
											<a href="#">
												{ login.forgotPwd }
											</a>
											<Link style={{color: '#17b', paddingLeft: 50}} to={`/`}>Go Back</Link>
										</span>
									</div>
								</div>
							</form>
						</div>
					</div>
        )
    }
}

export default createForm()(Login);