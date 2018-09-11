import React, { Component } from 'react';

export default class DevTV extends Component {

	render() {

		return (
			<div>
				<p>Movies</p>
				<p>Name: <span><input type="text" style={{ width: "80%" }} /></span></p>
				<p>Air Date: <span><input type="number" style={{ width: "80%" }} /></span></p>
				<p>File Location: <span><input type="text" style={{ width: "60%" }} /></span></p>
				<p>Poster Location: <span><input type="text" style={{ width: "60%" }} /></span></p>
			</div>
		);
	}
}