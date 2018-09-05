import React, { Component } from 'react';
import ListData from './ListData.js';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Data: []
		};
	}
	handleClick(event) {
		fetch("/read/" + event.target.id).then((result) => {
			return result.text();

		}).then((response) => {
			console.log(response);
			this.setState({ Data: lines });
		}).catch((error) => {
			console.log(error);

		});
	}

	render() {
		console.log(this.state);
		return (
			<div >
				<button id="FDr" onClick={this.handleClick.bind(this)}>F Drive</button>
				<button />
				<button />

				<ul id="data"><ListData dat={this.state.Data} /></ul>
			</div>
		);
	}

}