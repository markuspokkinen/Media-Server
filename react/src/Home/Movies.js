import React, { Component } from 'react';

import OneMov from './OneMovie';
import AddMovies from './AddMovies';

export default class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			one: false,
			add: false,
			movies: [],
			fav: [],
			onemov: 0,
			oneinfav: false
		};
	}
	componentDidMount() {
		this.newfavorites();
		fetch("/Movies").then(res => res.json()).then(response => {
			//console.log(response);
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

	newfavorites() {
		this.setState({
			fav: []
		}, () => {
			fetch("/Profiles/favmovies").then(res => res.json()).then(json => {
				for (var i = 0; i < json.length; i++) {
					fetch("/Movies/" + json[i]).then(res => res.json()).then(data => {
						//console.log(data);
						this.setState({
							fav: this.state.fav.concat(data)
						});
					});
				}
			});
		});
	}
	handleaddmovie() {
		this.setState({
			add: !this.state.add
		});
	}
	handlemovieClick(e) {
		this.setState({
			oneinfav: false
		});

		for (var i = 0; i < this.state.fav.length; i++) {
			console.log(this.state.fav[i]._id);
			if (parseInt(this.state.fav[i]._id,10) === parseInt(e.target.id,10)) {
				this.setState({
					oneinfav: true
				});
			}

		}
		console.log(e.target.id);
		//e.preventDefault();
		this.setState({
			onemov: e.target.id,
			one: true
		});
	}
	handleonemovclose() {
		this.setState({
			one: false,
			onemov: 0
		});
	}

	render() {
		let one;
		let add;
		if (this.state.one) {
			//console.log("data");
			one = <OneMov movie={this.state.onemov} close={this.handleonemovclose.bind(this)} favadded={this.newfavorites.bind(this)} infavorites={this.state.oneinfav} />;
		}
		if (this.state.add) {
			add = <AddMovies returndata={this.newmovies.bind(this)} />;
		}
		let movies = this.state.movies.map(mov => <button key={"all_" + mov._id} id={mov._id} onClick={this.handlemovieClick.bind(this)} style={{ height: "200px", width:"200px" }}>{mov.Title}</button>);
		let favs = this.state.fav.map(mov => <button key={"fav_" + mov._id} id={mov._id} onClick={this.handlemovieClick.bind(this)} style={{ height: "200px", width: "200px" }}>{mov.Title}</button>);
		return (
			<div>
				<p style={{ color:"White" }}>Favorite Movies</p>
				{favs}
				<p style={{ color: "White" }}>All Movies </p>
				<div>
					{movies}
				</div>
				<br />
				{one}
				<button onClick={this.handleaddmovie.bind(this)}>Add a movie</button>
				{add}
			</div>
		);


	}


}