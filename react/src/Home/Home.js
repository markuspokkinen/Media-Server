import React, { Component } from 'react';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	handleClick(event) {
		console.log(event.target);
		fetch("/" + event.target.id, {

		});
	}

	render() {
		return (
			<div>
				<p>Home Page</p>
			</div>
			);
	}
}