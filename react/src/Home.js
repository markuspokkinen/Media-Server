import React, { Component } from 'react';

export default class Home extends Component {
	constructor(props) {

	}

	handleClick(event) {
		console.log(event.target);
		fetch("/" + event.target.id, {

		});
	}

	render() {
		return (
			<div>
				<div id="Movies"></div>
			</div>
			);
	}
}