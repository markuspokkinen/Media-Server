import React, { Component } from 'react';

import Settings from './Settings';
import Movies from './Movies';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settings: false
		};
	}

	handleClick(event) {
		console.log(event.target);
		fetch("/" + event.target.id, {

		});
	}
	handlelogOut() {
		console.log("Home logout");
		fetch("Login/Out").then(res => { return res.json(); }).then(data => {
			console.log(data);
		});
		this.props.logoutHandler();
		
	}
	handlesettings() {
		this.setState({
			settings: !this.state.settings
		});
	}


	render() {
		let page = "";
		if (this.state.settings) {
			//setting valilehti
			page = <Settings />;
		} else {
			//elokuva valilehti
			page = <Movies />;
		}
		return (
			<div>
				<button onClick={this.handlelogOut.bind(this)}>Log Out</button>
				<button onClick={this.handlesettings.bind(this)}>Settings</button>
				{page}
			</div>
			);
	}
}