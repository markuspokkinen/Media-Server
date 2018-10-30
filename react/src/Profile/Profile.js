import React, { Component } from 'react';
import Style from "./ProfileStyle";

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profiles: []
		};
	}
	componentDidMount() {
		fetch("Profiles/all").then(res => res.json()).then(json => {
			//console.log(json);
			this.setState({
				profiles: json
			});
		});
	}
	componentWillReceiveProps(nextprops) {
		//console.log(nextprops);
		fetch("Profiles/all").then(res => res.json()).then(json => {
			//console.log(json);
			this.setState({
				profiles: json
			});
		});
	}
	profilechoosehandler(e) {
		//console.log(e.target);
		fetch("/Profiles", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				profileID: e.target.id
			})

		}).then(res => res.json()).then(json => {
			//console.log(json);
			this.props.chosenprofilehandler();
		});
	}

	render() {

		//console.log(this.setState.profiles);
		let prf = this.state.profiles.map((prof) => <div style={{ display: "inline-block" }}><button id={prof.id} key={"but" + prof.id} onClick={this.profilechoosehandler.bind(this)} style={Style.profilestyle} /><p key={"p" + prof.id} style={{ position:"relative", left: "50%" }}>{prof.name}</p></div >);
		return (
			<div id="profIDS" style={Style.profileDivStyle}>
				{prf}
			</div>

		);


	}

}