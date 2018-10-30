import React, { Component } from 'react';

export default class AddMovies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			id: 0,
			release: "",
			desc: "",
			movielist: []
		};
	}
	onchangeHandler(e) {
		e.preventDefault();
		let name = e.target.value;
		this.setState({
			name: name
		});
		console.log(name);
		let searchval = name.split(" (")[0];
		fetch("/Movies/query/" + searchval).then(res => res.json()).then(response => {
			//console.log(response);
			let list = [];
			response.forEach(mov => {
				let optval = mov.title + " (" + mov.release_date + ")";
				list.push(< option value={optval} key={mov.id} />);
				if (name === optval) {
					this.setState({
						id: mov.id,
						release: mov.release_date,
						desc: mov.overview
					});
				}

			});
			this.setState({
				movielist: list
			});
		});
	}
	onsubmithandler(e) {
		e.preventDefault();
		console.log(e.target);
		fetch("/Movies", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name.split(" (")[0],
				id: this.state.id,
				release: this.state.release,
				desc: this.state.desc
			})

		}).then(res => res.json()).then(response => {
			if (response.n === 1 && response.ok === 1) {
				this.props.returndata();
				this.setState({
					name: "",
					id: 0,
					release: "",
					desc: "",
					movielist: []
				});
			}
		});
	}


	render() {

		return (
			<form autoComplete="off" onSubmit={this.onsubmithandler.bind(this)}>
				<p>Name: <input id="movieSearchBar" type="text" list="movielist" placeholder="Movie Name" onChange={this.onchangeHandler.bind(this)} value={this.state.name} /></p>
				<input type="hidden" id="moviehidID" name="movID" value={this.state.id} />
				<p>Release Date: <input id="movieRelease" type="text" value={this.state.release} /></p>
				<p>Movie Desc: <textarea id="movieDesc" value={this.state.desc} /></p>
				<datalist id="movielist">{this.state.movielist}</datalist>
				<input type="submit" value="Add Movie to Database" />
			</form>

		);


	}


}