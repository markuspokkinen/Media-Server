import React, { Component } from 'react';

export default class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			profiles: []
		};
	}
	componentDidMount() {
		fetch("Profiles/all").then(res => res.json()).then(json => {
			console.log(json);
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
		let prf = this.state.profiles.map((prof) => <button id={prof.id} key={prof.id} onClick={this.profilechoosehandler.bind(this)}>{prof.name}</button>);
		return (
			<div id="profIDS">
				{prf}
			</div>

		);


	}

}