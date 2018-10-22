import React, { Component } from 'react';

export default class AddMovies extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			id: 0,
			release: "",
			desc: ""
		};
	}
	onchangeHandler(e) {
		e.preventDefault();
	}

	render() {

		return (
			<form autoComplete="off" method="post" action="/Movies">
				<p>Name: <input id="movieSearchBar" type="text" list="movielist" placeholder="Movie Name" onChange={this.onchangeHandler.bind(this)} /></p>
				<input type="hidden" id="moviehidID" name="movID" />
				<p>Release Date: <input id="movieRelease" type="text" /></p>
				<p>Movie Desc: <textarea id="movieDesc"></textarea></p>
				<datalist id="movielist"></datalist>
				<input type="submit" value="Add Movie to Database" />
			</form>

		);


	}


}