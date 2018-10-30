import React, { Component } from 'react';
import Style from './userstyle';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};
	}

	loginformonsubmit = (event) => {
		event.preventDefault();
		console.log(event.target);
		let email = event.target[0].value;
		let password = event.target[1].value;
		//console.log(email);
		//console.log(password);
		fetch("/Login", {
			method: "POST",
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				User: {
					Email: email,
					Password: password
				}
			})
		}).then(res => res.json()).then(dat => {
			console.log(dat);
			if (dat.user) {
				console.log(dat.user);
				this.props.logincallback();
			} else {
				//console.log(dat);
				this.setState({
					error: "Email or Password was wrong"
				});
			}
		});
	}

	render() {

		return (
			<div style={Style.divstyle}>
				<form onSubmit={this.loginformonsubmit.bind(this)} style={Style.formstyle}>
					<h1 style={Style.h1}>SIGN IN</h1>
					<input name="User[Email]" required placeholder="Email" style={Style.formEmailInputstyle} />
					<br />
					<input name="User[Password]" required placeholder="Password" type="password" style={Object.assign({},Style.formEmailInputstyle, Style.fromPasswordInputstyle)} />
					<br />
					<input value="Sign In" type="submit" style={Style.subutton} />
					<p style={Style.p}>{this.state.error}</p>
				</form>
			</div>

		);
	}
}