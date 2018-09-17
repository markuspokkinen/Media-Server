import React, { Component } from 'react';
import DevTV from './classes/DevTV';
import DevMov from './classes/DevMovies';
import DevMus from './classes/DevMusic';

export default class DevLeftDiv extends Component {

	constructor(props) {
		super(props);
		this.state = {
			type: this.props.arr[2],
			TV: '',
			Music: '',
			Movies:''
		};
	}
	componentWillReceiveProps(nexProps) {
		console.log(nexProps);
		this.setState({
			type: nexProps.arr[2],
			Arr: nexProps.arr
		});
		if (nexProps.arr[2] === "Movies") {
			this.setState({
				Movies: {

				}
			});
		}
		if (nexProps.arr[2] === "TV Series") {
			this.setState({
				TV: {
					Show: nexProps.arr[3],
					EpisodeName: nexProps.arr[5],
					fileLocation: nexProps.arr[0]
				}
			});
		}
		if (nexProps.arr[2] === "music") {
			this.setState({
				Music: {

				}
			});
		}

		
	}
	callback = (Data) => {
		this.setState(Data);
	}

	changeHandle(event) {
		this.setState({ type: event.target.value });

		console.log(event.target.value);
	}

	render() {
		var rendopo;
		if (this.state.type === "Movies") {
			rendopo = (<DevMov callback={this.callback} />);
		} if (this.state.type === "TV Series") {
			rendopo = (<DevTV arr={this.props.arr} TV={this.state.TV} callback={this.callback} />);

		} if (this.state.type === "music") {
			rendopo = (<DevMus callback={this.callback} />
				);
		}
		return (
			<div style={{ backgroundColor: 'rgb(255, 255, 255)', width: '30%', position: 'fixed', right: '2%', top: '2%' }}>
				{rendopo}
			</div>
		);
	}
}