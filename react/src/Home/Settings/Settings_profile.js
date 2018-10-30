import React, { Component } from 'react';
import One from './Settings_oneprofile';
import Style from '../../Profile/ProfileStyle';

export default class Setting_profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles:[]
		};
	}

	componentDidMount() {
		fetch("Profiles/all").then(res => res.json()).then(json => {
			this.setState({
				profiles: json
			});
		});
	}
	handleprofclick(e) {
		console.log(e)
	}

	render() {
		let prf = this.state.profiles.map((prof) => <button id={prof.id} key={prof.id} onClick={this.handleprofclick.bind(this)} >{prof.name}</button>);
		return (
			<div style={Style.profileDivStyle}>
				<h1>Profiles</h1>
				{prf}
			</div>
		);
	}
}