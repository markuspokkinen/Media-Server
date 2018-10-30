import React, { Component } from 'react';
import User from './User/UserCombiner';
import Profile from "./Profile/ProfileCombiner";
import Home from "./Home/Home";

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: false,
			profile: false
		};
	}
	componentDidMount() {
		fetch("/session").then(res => res.json())
			.then(json => {
				//console.log(json);
				this.setState({
					user: json.user,
					profile: json.profile
				});
			});
	}
	logoutHandler() {
		this.setState({
			user: false,
			profile: false
		});
	}
	logedinHandler = () => {
		//console.log("app login handler");
		this.setState({
			user: true
		});
	}
	profileinHandler() {
		//console.log("App profilein");
		this.setState({
			profile: true
		});
	}
	render() {
		//console.log(this.state);
		let data;
		if ((this.state.user) && (this.state.profile)) {
			data = <Home logoutHandler={this.logoutHandler.bind(this)} />;
		} else if (this.state.user) {
			data = <Profile logoutHandler={this.logoutHandler.bind(this)} logprofilein={this.profileinHandler.bind(this)} />;

		} else {
			data = <User logedinHandler={this.logedinHandler.bind(this)} />;
		}
		return (
			<div>
				{data}
			</div>
		);
	}

}