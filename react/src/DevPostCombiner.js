import React, { Component } from 'react';
import DevLeft from './DevLeftDiv';

export default class DevPostCombiner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Data: []
		};
	}
	handleClick(event) {
		fetch("/dev/" + event.target.id).then((result) => {
			return result.json();
		}).then((response) => {
			console.log(response);
			this.setState({ Data: response });

		}).catch((error) => {
			console.log(error);

		});
	}

	render() {
		var list = this.state.Data.map((line) =>
			<li key={line}><a style={{ cursor: 'pointer' }}>{line}</a></li>
		);
		return (
			<div>
				<button id="FDr" onClick={this.handleClick.bind(this)}>F Drive</button>
				<button id="EDr" onClick={this.handleClick.bind(this)}>E Drive</button>
				<button id="HDr" onClick={this.handleClick.bind(this)}>H Drive</button>
				<ul>{list}</ul>
				<DevLeft />
			</div>
		);
	}
}