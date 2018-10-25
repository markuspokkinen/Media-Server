import React, { Component } from 'react';
import SetProf from './Setting_profile';

export default class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles: [],
			oneprof: null

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
	handleprofclick(e) {
		this.setState({
			oneprof: e.target.id
		});
	}

	render() {
		let prf = this.state.profiles.map((prof) => <button id={prof.id} key={prof.id} onClick={this.handleprofclick.bind(this)} >{prof.name}</button>);
		return (
			<div>
				<p>Settings page</p>
				{prf}
				<SetProf id={this.state.oneprof} />
			</div>
		);


	}


}