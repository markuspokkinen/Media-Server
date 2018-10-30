import React, { Component } from 'react';
import Create from "./CreateProfile";
import Chooseprof from "./Profile";
import BStyle from '../basicStyle';
import Style from './ProfileStyle';

export default class ProfileCombiner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newprofile: false,
			profiles: 0
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
			profiles: this.state.profiles + 1
		});
	}

	render() {

		const logoutbuttonstyle = {
			position: "absolute",
			top: "2px",
			right: "2px",
			width: "auto",
			backgroundColor: "red",
			color: "White",
			border: 0,
			height: "30px"
		};
		const createprofilebuttonstyle = {
			position: "absolute",
			top: "2px",
			left: "2px",
			backgroundColor: "red",
			color:"white",
			border: 0,
			height: "30px" 
		};

		let newprf;
		let createtext = "Create new Profile";
		if (this.state.newprofile) {
			newprf = <Create addcallback={this.newprofileadded.bind(this)} />;
			createtext = "Back to Profile Chooser";
		} else {
			createtext = "Create new Profile";
			newprf = "";
		}


		return (
			<div style={Style.maindivstyle}>
				<div style={{ position: "fixed", top: 0, width: "100%", height: "20px" }}>
					<button onClick={this.handlelogOut.bind(this)} style={BStyle.topRight}>Log Out</button>
					<button onClick={this.handlenewprofilebutton.bind(this)} style={createprofilebuttonstyle}>{createtext}</button>
				</div>
				<div style={{ position: "relative", height: "90vh", top: "10vh" }}>
					<Chooseprof chosenprofilehandler={this.handlechosenprofile.bind(this)} profiles={this.state.profiles} />
				</div>
				<div style={{ position: "absolute", top: "5vh" }}>
					{newprf}
				</div>
			</div>
		);
	}

}