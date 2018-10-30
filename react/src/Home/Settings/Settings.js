import React, { Component } from 'react';
import SetProf from './Settings_profile';
import MovSet from './Settings_Movies';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profile: true,
			movies: false

		};
	}
	handleopenProfile() {
		if (!this.state.profile) {
			this.setState({
				profile: !this.state.profile,
				movies: !this.state.movies
			});

		}
	}
	handleopenmovies() {
		if (!this.state.movies) {
			this.setState({
				profile: !this.state.profile,
				movies: !this.state.movies
			});

		}
	}

	render() {
		let settings;
		if (this.state.profile) {
			settings = <SetProf />;
		} else if (this.state.movies) {
			settings = <MovSet />;
		}
		return (
			<div>
				<p>Settings page</p>
				<button onClick={this.handleopenProfile.bind(this)}>Profile Settings</button>
				<button onClick={this.handleopenmovies.bind(this)}>Movie Settings</button>
				{settings}
			</div>
		);


	}


}