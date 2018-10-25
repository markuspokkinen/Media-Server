import React, { Component } from 'react';

import OneMov from './OneMovie';

export default class Movies extends Component {
	constructor(props) {
		super(props);
		this.state = {
			one: false
		};
	}

	render() {
		let data;

		if (this.state.one) {
			data = <OneMov />;
		}

		return (
			<div>
				
				<p>All Movies </p>
				{data}
			</div>
		);


	}


}