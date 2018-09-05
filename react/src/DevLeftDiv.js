import React, { Component } from 'react';

export default class DevLeftDiv extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: ""
		};
	}
	render() {
		return (
			<div style={{ backgroundColor: 'rgb(255, 255, 255)', width: '20%', position: 'fixed', right: '2%', top:'2%' }}>
				<p>TV Show</p>
				<p>Name: <span><input type="text" style={{ width:"80%" }} /></span></p>
				<p>Season: <span><input type="number" style={{ width: "80%" }} /></span></p>
			</div>
			);
	}
}