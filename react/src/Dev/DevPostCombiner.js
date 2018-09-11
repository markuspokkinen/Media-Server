﻿import React, { Component } from 'react';
import DevLeft from './DevLeftDiv';
import DevList from './DevList';

export default class DevPostCombiner extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Data: [],
			Arr:[]
		};
	}
	handleClick(event) {
		fetch("/dev/" + event.target.id).then((result) => {
			return result.json();
		}).then((response) => {
			console.log(response);
			this.setState({ Data: response });

		}).catch((error) => {
			console.log(error);

		});
	}
	callback = (data) => {
		console.log(data);
		this.setState({ Arr: data });
		
	}

	render() {
		return (
			<div>
				<button id="FDr" onClick={this.handleClick.bind(this)}>F Drive</button>
				<button id="EDr" onClick={this.handleClick.bind(this)}>E Drive</button>
				<button id="HDr" onClick={this.handleClick.bind(this)}>H Drive</button>
				<DevList list={this.state.Data} callback={this.callback} />
				<DevLeft arr={this.state.Arr} />
			</div>
		);
	}
}