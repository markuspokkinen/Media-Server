import React, { Component } from 'react';

import Settings from './Settings/Settings';
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
	handlehomebutton() {
		this.setState({
			settings: false
		});
	}


	render() {
		let page = "";
		let adm = "";
		if (this.state.settings) {
			//setting valilehti
			page = <Settings />;
		} else {
			//elokuva valilehti
			page = <Movies />;
		}
		return (
			<div style={{ backgroundColor: "black", height: "100vh" }}>
				<div style={{ position: "fixed", top: 0, height: "10vh", width: "100%" }}>
					<button onClick={this.handlehomebutton.bind(this)} style={{ position: "absolute", top: "2px", left: "2px", width: "auto", backgroundColor: "red", color: "White", border: 0, height: "30px" }}>HOME</button>
					<button onClick={this.handlelogOut.bind(this)} style={{ position: "absolute", top: "2px", right: "2px", width: "auto", backgroundColor: "red", color: "White", border: 0, height: "30px" }}>Log Out</button>
					<button>Change Profile</button>
					<button onClick={this.handlesettings.bind(this)} style={{ position: "absolute", top: "2px", right: "90px", width: "auto", backgroundColor: "red", color: "White", border: 0, height: "30px" }}>Settings</button>
				</div>
				<div style={{ position: "relative", top: "10vh", height: "90vh" }}>
					{page}
				</div>
				{adm}
			</div>
		);
	}
}