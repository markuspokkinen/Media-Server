import React, { Component } from 'react';

export default class DevTV extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			Show: this.props.arr[3],
			EpisodeName: this.props.arr[5],
			fileLocation: this.props.arr[0],
			AirDate: "",
			filLoc: "",
			APIURL:"",
			Season: "",
			EpisodeNum: ""
		});
	}
	componentWillReceiveProps(nexProps) {
		const prop = nexProps.TV;
		this.setState({prop});
	}
	handleClick(event) {
		event.preventDefault();
		console.log(this.state);
		fetch("/TVseries", {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)

		}).then(res => res.json()).then(response => {
			console.log(response);
		});
	}
	handleChange(event) {
		var change = {};
		change[event.target.name] = event.target.value;
		this.setState(change, () => { this.props.callback({ TV: this.state }); });
	}

	render() {
		console.log(this.props.TV);
		return (
			<div>
				<p>TV Show</p>
				<p>Show: <span><input name="Show" type="text" style={{ width: "80%" }} value={this.state.Show} onChange={this.handleChange.bind(this)} /></span></p>
				<p>Season: <span><input name="Season" type="number" style={{ width: "60%" }} value={this.state.Season} onChange={this.handleChange.bind(this)} /></span></p>
				<p>Season Poster Location: <span><input name="PosLoc" type="text" style={{ width: "60%" }} onChange={this.handleChange.bind(this)}/></span></p>
				<p>Episode: <span><input name="EpisodeNum" type="number" style={{ width: "60%" }} onChange={this.handleChange.bind(this)}/></span></p>
				<p>Episode Name: <span><input name="EpisodeName" type="text" style={{ width: "60%" }} value={this.state.EpisodeName} onChange={this.handleChange.bind(this)}/></span></p>
				<p>Episode Air Date: <span><input name="AirDate" type="text" style={{ width: "60%" }} onChange={this.handleChange.bind(this)} /></span></p>
				<p>File Location: <span><input name="filLoc" type="text" style={{ width: "60%" }} value={this.state.fileLocation} onChange={this.handleChange.bind(this)} /></span></p>
				<p>API URL: <span><input name="APIURL" type="text" style={{ width: "60%" }} value={this.state.fileLocation} onChange={this.handleChange.bind(this)} /></span></p>

				<button onClick={this.handleClick.bind(this)}>Post</button>
			</div >);
	}
}