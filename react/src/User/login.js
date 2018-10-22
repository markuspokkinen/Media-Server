import React, { Component } from 'react';

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
			}),
		}).then(res => res.json()).then(dat => {
			console.log(dat);
			if (dat.user) {
				console.log(dat.user);
				this.props.logincallback();
			} else {
				console.log(dat);
				this.setState({
					error: dat
				});
			}
		});
	}

	render() {
		return (
			<div>
				<form onSubmit={this.loginformonsubmit.bind(this)}>
					<p>Sign in page</p>
					<input name="User[Email]" required placeholder="Email" />
					<br />
					<input name="User[Password]" required placeholder="Password" type="password" />
					<br />
					<input value="Sign In" type="submit" />
					<p>{this.state.error}</p>
				</form>
			</div>

		);
	}
}