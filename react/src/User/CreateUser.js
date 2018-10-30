import React, { Component } from 'react';
import Style from './userstyle';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ""
		};

	}
	submitHandler(e) {
		e.preventDefault();
		let email = e.target[0].value;
		let password = e.target[1].value;
		fetch("/newUser", {
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
		}).then(res => res.json()).then(json => {
			//console.log(json);
			//console.log(json.body.ok);
			if (json.body.ok !== undefined) {
				//käyttäjä lisätty
				//console.log("ok");
				this.props.backtologin("User Created");
			} else {
				console.log(json.body);
				//console.log("error");
				//ei lisätty
				if (json.body.length === 2) {
					this.setState({
						error: "Invalid Email and Password"
					});
				} else if (json.body.length === 1) {
					console.log(json.body[0].param);
					if (json.body[0].param === "User.Email") {
						this.setState({
							error: "Invalid Email"
						});
					} else {
						this.setState({
							error: "Invalid Password"
						});
					}
				}
			}
		});
	}

	render() {
		return (
			<div style={Style.divstyle}>
				<form onSubmit={this.submitHandler.bind(this)} style={Style.formstyle}>
					<h1 style={Style.h1}>CREATE ACCOUNT</h1>
					<input name="User[Email]" required placeholder="Email" type="text" style={Style.formEmailInputstyle} />
					<br />
					<input name="User[Password]" required placeholder="Password 7 charecters" type="password" style={Object.assign({}, Style.formEmailInputstyle, Style.fromPasswordInputstyle)} />
					<br />

					<input value="Create Account" type="submit" style={Style.subutton} />
					<p style={Style.p}>{this.state.error}</p>
				</form>
			</div >
		);

	}

}