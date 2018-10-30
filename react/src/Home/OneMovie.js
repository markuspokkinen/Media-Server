import React, { Component } from 'react';

export default class OneMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			_id: 0,
			Title: "",
			ReleaseDate: "",
			Overview: "",
			AddedByProfile: "",
			addedByUser: "",
			errors: "",
			infav: this.props.infavorites
		};
	}

	componentDidMount() {
		//console.log(this.props.movie);
		this.getmovie(this.props.movie);


	}

	componentWillReceiveProps(nexprops) {
		//console.log(nexprops);
		this.getmovie(nexprops.movie);
		this.setState({
			infav: nexprops.infavorites
		});
	}
	handleaddtofav(e) {
		e.preventDefault();
		if (!this.state.infav) {
			//add movie to favorites
			fetch("/Profiles/fav", {
				method: "POST"
			}).then(res => res.json())
				.then(data => {
					console.log(data);
					if (data.ok === 1) {
						this.props.favadded();
						this.setState({
							errors: "movie added to fav"
						});
					} else {
						this.setState({
							errors: data
						});
					}
				});
		} else {
			fetch("/Profiles/fav", {
				method: "DELETE"
			}).then(res => res.json())
				.then(data => {
					if (data.ok === 1) {
						this.props.favadded();
						this.setState({
							errors: "movie has been removed from favorites"
						});
					} else {
						this.setState({
							errors: data
						});
					}
				});
		}

	}
	handleclose() {
		this.props.close();
	}
	getmovie(id) {
		fetch("/Movies/" + id)
			.then(res => res.json())
			.then(json => {
				this.setState({
					_id: json._id,
					Title: json.Title,
					ReleaseDate: json.ReleaseDate,
					Overview: json.Overview,
					AddedByProfile: json.AddedByProfile,
					addedByUser: json.addedByUser
				});
			});
	}

	render() {
		let fav = "Add to favorite";
		console.log(this.state.infav);
		if (this.state.infav) {
			fav = "remove from favorites";
		}

		return (
			<div style={{ backgroundColor: "lightgray", width:"auto" }}>
				<p style={{}}>Movies here</p>
				<h1>{this.state.Title}, {this.state.ReleaseDate}</h1>
				<p>{this.state.Overview}</p>
				<button onClick={this.handleaddtofav.bind(this)}>{fav}</button>
				<button onClick={this.handleclose.bind(this)}>Close</button>
				<p>{this.state.errors}</p>
			</div>
		);


	}


}