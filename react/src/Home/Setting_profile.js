import React, { Component } from 'react';

export default class Setting_profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}

	componentWillReceiveProps(nexprops) {
		console.log(nexprops.id);
		if (nexprops.id !== null) {
			fetch("/Profiles/" + nexprops.id).then(res => res.json()).then(response => {
				//console.log(response);
				this.setState({
					name: response.ProfileName
				});
			});
		}
	}
	handlenameChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	render() {
		if (this.state.name !== "") {
			return (
				<div>
					<p>Profile Settings</p>
					<input value={this.state.name} onChange={this.handlenameChange.bind(this)} />
					<button>Change name</button>
					<button>Remove profile</button>
				</div>
			);
		} else {
			return (
				<div>

				</div>
				)
		}
	}
}