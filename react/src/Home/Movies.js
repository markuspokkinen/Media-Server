import React, { Component } from 'react';

import OneMov from './OneMovie';
import AddMovies from './AddMovies';

export default class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			one: false,
			add: false,
			movies:[]
		};
	}
	componentDidMount() {
		fetch("/Movies").then(res => res.json()).then(response => {
			console.log(response);
			this.setState({
				movies: response
			});
		});
	}
	newmovies() {
		fetch("/Movies").then(res => res.json()).then(response => {
			console.log(response);
			this.setState({
				movies: response
			});
		});
	}

	handleaddmovie() {
		this.setState({
			add: !this.state.add
		});
	}

	render() {
		let data;
		let add;
		if (this.state.one) {
			data = <OneMov />;
		}
		if (this.state.add) {
			add = <AddMovies returndata={this.newmovies.bind(this)} />;
		}
		let movies = this.state.movies.map(mov => <button key={mov._id}>{mov.Title}</button>);

		return (
			<div>
				
				<p>All Movies </p>
				{movies}
				<br />
				<button onClick={this.handleaddmovie.bind(this)}>Add a movie</button>
				{data}
				{add}
			</div>
		);


	}


}