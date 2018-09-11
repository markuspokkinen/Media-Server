import React, { Component } from 'react';

export default class GetItems extends Component {

	handleClick(event) {
		console.log(event.target);
		fetch("/" + event.target.id, {

		});
	}

	render() {
		return (
			<div>
				<button onClick={this.handleClick.bind(this)} id="movies">Movies</button>
				<button onClick={this.handleClick.bind(this)} id="TVSeries">TV Series</button>
				<button onClick={this.handleClick.bind(this)} id="music">Music</button>
			</div>
			);
	}
}