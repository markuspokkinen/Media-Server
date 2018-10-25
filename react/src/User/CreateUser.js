import React, { Component } from 'react';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error:""
		}

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
			console.log(json);
			if (json.body.ok) {
				//käyttäjä lisätty
				this.props.backtologin("User Created");
			} else {
				//ei lisätty
				this.setState({
					error: json.body
				});
			}
		});
	}

	render() {
		return (
			<div onSubmit={this.submitHandler.bind(this)}>
				<p>Sign up page</p>
				<form method="post" action="/NewUser">
					<input name="User[Email]" required placeholder="Email" type="text" />
					<br />
					<input name="User[Password]" required placeholder="Password 7 charecters" type="password" />
					<br />
					<p>{this.state.error}</p>
					<input value="Create User" type="submit" />
				</form>
			</div >

		);

	}

}