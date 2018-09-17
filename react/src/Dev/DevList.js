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
		//console.log(targ);
		this.props.callback(targ);
		this.setState({ url: event.target.innerHTML });
	}

	contextmenuHandle(event) {
		event.preventDefault();
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
				<video src={'/TVSeries/file?file=' + this.state.url} onContextMenu={this.contextmenuHandle.bind(this)} controls controlsList="nodownload" autoPlay style={{ position: "fixed", bottom: "0.5%", right: "0.5%", width: "300px" }} />
			</div>
		);
	}
}