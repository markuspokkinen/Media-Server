import React, { Component } from 'react';

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
			console.log(json);
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
		if (this.state.oneprof !== null) {
			console.log();
			//yksi
		}
		return (
			<div>
				<p>Settings page</p>
				{prf}
			</div>
		);


	}


}