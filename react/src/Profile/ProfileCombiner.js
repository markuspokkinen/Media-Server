import React, { Component } from 'react';
import Create from "./CreateProfile";
import Chooseprof from "./Profile";

export default class ProfileCombiner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newprofile: false,
			profiles:0
		};
	}

	handlelogOut() {
		fetch("Login/Out").then(res => { return res.json(); }).then(data => {
			console.log(data);
		});
		this.props.logoutHandler();
	}
	handlenewprofilebutton() {
		this.setState({
			newprofile: !this.state.newprofile
		});
	}
	handlechosenprofile() {
		//console.log("combiner profile in");
		this.props.logprofilein();
	}
	newprofileadded() {
		this.setState({
			profiles: this.state.profiles+1
		});
	}

	render() {
		let newprf;
		if (this.state.newprofile) {
			newprf = <Create addcallback={this.newprofileadded.bind(this)} />;
		} else {
			newprf = "";
		}
		return (
			<div>
				<button onClick={this.handlelogOut.bind(this)}>Log Out</button>
				<button onClick={this.handlenewprofilebutton.bind(this)}>Create new Profile</button>
				{newprf}
				<Chooseprof chosenprofilehandler={this.handlechosenprofile.bind(this)} profiles={this.state.profiles} />
			</div>
		);
	}

}