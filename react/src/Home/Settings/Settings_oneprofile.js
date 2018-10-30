import React, { Component } from 'react';

export default class Setting_oneprofile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Moviefav: [],
			ProfileName: "",
			TVfav: [],
			UserID: "",
			_id: "",
			error: ""

		};
	}
	componentDidMount() {
		console.log(this.props.id);
		if (this.props.id !== null) {
			fetch("/Profiles/" + this.props.id).then(res => res.json()).then(response => {
				console.log(response);
				this.setState({
					Moviefav: response.Moviefav,
					ProfileName: response.ProfileName,
					TVfav: response.TVfav,
					UserID: response.UserID,
					_id: response._id
				});
			});
		}
	}
	componentWillReceiveProps(nexprops) {
		console.log(nexprops.id);
		if (nexprops.id !== null) {
			fetch("/Profiles/" + nexprops.id).then(res => res.json()).then(response => {
				console.log(response);
				this.setState({
					Moviefav: response.Moviefav,
					ProfileName: response.ProfileName,
					TVfav: response.TVfav,
					UserID: response.UserID,
					_id: response._id
				});
			});
		}
	}
	handlenameChange(e) {
		//console.log(this.state);
		this.setState({
			ProfileName: e.target.value
		});
	}
	handlechangecommit(e) {
		e.preventDefault();
		//console.log(e.target.id);
		console.log(this.state);
		if (e.target.id === "setprofchang") {
			//Change name
			fetch("/Profiles/update", {
				method: "POST",
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},

				body: JSON.stringify(this.state)

			}).then(res => res.json()).then(response => {
				console.log(response);
				if (response.n === 1 && response.ok === 1) {
					this.setState({
						error: "Profile name Changed"
					});
				}
			});
		} else {
			// remove profile
			fetch("/Profiles/" + this.state._id, {
				method: "DELETE",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			}).then(res => res.json()).then(response => {
				console.log(response);
				if (response.n === 1 && response.ok === 1) {
					this.setState({
						error: "Profile has been removed"
					});
				} else if (response.n === 0 && response.ok === 1) {
					this.setState({
						error: "Profile has already been removed"
					});
				}
			});
		}
	}
	render() {
		return (
			<div>
				<p>Profile Settings</p>
				<input value={this.state.ProfileName} onChange={this.handlenameChange.bind(this)} />
				<button id="setprofchang" onClick={this.handlechangecommit.bind(this)}>Change name </button>
				<button id="setprofrem" onClick={this.handlechangecommit.bind(this)}>Remove profile </button>
				<p>{this.state.error}</p>
			</div>
		);

	}

}