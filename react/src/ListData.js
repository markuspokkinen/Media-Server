import React, { Component } from 'react';

export default class App extends Component {

	constructor(props) {
		super(props);

	}
	ComponentWillReceiveProps(nexProps) {
		this.setState({
			Data: nexProps.dat
		});
	}
	handleClick(event) {
		console.log(event.target.innerHTML);
		fetch("/video/" + event.target.innerHTML).then((result) => {
			console.log(result);
		});
	}
	render() {
		console.log(this.props.dat);
		const lines = this.props.dat.map((line) =>
			<li><a onClick={this.handleClick.bind(this)}>{line}</a></li>
		);
		return (
			lines
		);
	}
}