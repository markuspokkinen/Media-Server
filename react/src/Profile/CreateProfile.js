import React, { Component } from 'react';

export default class CreateProfile extends Component {

	onsubmitHandler(e) {
		console.log(e.target[0].value);
		e.preventDefault();
		fetch("/Profiles/new", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				profileName: e.target[0].value
			})

		}).then(res => res.json()).then(json => {
			//console.log(json.body);
			if (json.body.body.ok) {
				//lisätty
				this.props.addcallback();
			} else {
				//ei lisätty
				console.log(json);
			}
			
		});
	}

	render() {

		return (
			<form onSubmit={this.onsubmitHandler.bind(this)}>
				<input type="text" name="profileName" required placeholder="New Profile Name" />
				<br />
				<input value="Add New Profile" type="submit" />
			</form>
			);
	}

}