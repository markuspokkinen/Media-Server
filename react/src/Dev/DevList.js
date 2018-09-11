import React, { Component } from 'react';

export default class DevList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			Data: this.props.list,
			url: ""
		};
	}
	componentWillReceiveProps(nexprops) {
		this.setState({ Data: nexprops.list });
	}
	handleClick(event) {
		var targ = event.target.innerHTML.split("\\");
		targ.unshift(event.target.innerHTML);
		console.log(targ);
		this.props.callback(targ);
		fetch('/TVSeries/file?file=' + event.target.innerHTML, {}).then(res => {
			//console.log(res.url);
			this.setState({ url: res.url });
		});

	}

	render() {

		var list = this.state.Data.map((line) =>
			<li key={line}><a onClick={this.handleClick.bind(this)} style={{ cursor: 'pointer' }}>{line}</a></li>
		);
		return (
			<div>
				<ul>
					{list}
				</ul>
				<video src={this.state.url} controls style={{ position: "fixed", bottom: "0", right: "0", width:"300px" }} autoPlay />
			</div>
		);
	}
}