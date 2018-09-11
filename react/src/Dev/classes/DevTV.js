import React, { Component } from 'react';

export default class DevTV extends Component {


	render() {

		return (
			<div>
				<p>TV Show</p>
				<p>Name: <span><input type="text" style={{ width: "80%" }} /></span></p>
				<p>Season: <span><input type="number" style={{ width: "60%" }} /></span></p>
				<p>Season Poster Location: <span><input type="text" style={{ width: "60%" }} /></span></p>
				<p>Episode: <span><input type="number" style={{ width: "60%" }} /></span></p>
				<p>Episode Name: <span><input type="text" style={{ width: "60%" }} /></span></p>
				<p>Episode Air Date: <span><input type="text" style={{ width: "60%" }} /></span></p>
				<p>File Location: <span><input type="text" style={{ width: "60%" }} /></span></p>
			</div >);
	}
}