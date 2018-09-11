import React, { Component } from 'react';
import Dev from './Dev/DevPostCombiner';
import Items from './GetItems';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dev: false
		};
	}

	handleClick(event) {
		if (this.state.dev) {
			this.setState({ dev: false });
		} else {
			this.setState({ dev: true });
		}
	}

	render() {
		var rend;
		if (this.state.dev) {
			rend = <Dev />;
		} else {
			rend = <Items />;
		}
		return (
			<div style={{ backgroundColor: 'rgb(88, 88, 88)' }}>
				<button onClick={this.handleClick.bind(this)}>Turn Dev on and off</button>
				{rend}
			</div>
		);
	}

}