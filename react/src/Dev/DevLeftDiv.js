import React, { Component } from 'react';
import DevTV from './classes/DevTV';
import DevMov from './classes/DevMovies';
import DevMus from './classes/DevMusic';

export default class DevLeftDiv extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "TV Series",
			Arr: this.props.arr
		};
	}
	componentWillReceiveProps(nexProps) {
		this.setState({
			Arr: nexProps.arr
		});
	}

	changeHandle(event) {
		this.setState({ name: event.target.value });

		console.log(event.target.value);
	}

	render() {
		var rendopo;
		if (this.state.name === "Movies") {
			rendopo = (<DevMov />);
		} if (this.state.name === "TV Series") {
			rendopo = (<DevTV />);

		} if (this.state.name === "music") {
			rendopo = (<DevMus />
				);
		}
		return (
			<div style={{ backgroundColor: 'rgb(255, 255, 255)', width: '30%', position: 'fixed', right: '2%', top: '2%' }}>
				<select name="choose" onChange={this.changeHandle.bind(this)}>
					<option value="TV Series">TV Series</option>
					<option value="Movies">Movie</option>
					<option value="music">Music</option>
				</select>
				{rendopo}
			</div>
		);
	}
}