import React, { Component } from 'react';
import Login from './login';
import Createuser from './CreateUser';

export default class UserCombiner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: false,
			logedin: false,
			newuserbutton: "Sign up",
			user:""
		};

	}

	handlenewuser = (event) => {
		this.setState({
			newUser: !this.state.newUser
		}, () => {
			if (this.state.newUser) {
				this.setState({
					newuserbutton: "Sign in"
				});
			} else {
				this.setState({
					newuserbutton: "Sign up"
				});
			}
		});
	}
	backtologin = (res) => {
		this.setState({
			newUser: false,
			user:res
		});
	}
	logedin = () => {
		//kirjauduttu sisään
		console.log("logedin");
		this.props.logedinHandler();
	}
	render() {
		let data;
		if (this.state.newUser) {
			data = <Createuser backtologin={this.backtologin.bind(this)} />;
		} else {
			data = <Login newuserbutton={this.handlenewuser.bind(this)} logincallback={this.logedin.bind(this)} />;
		}
		return (
			<div>
				<button onClick={this.handlenewuser}>{this.state.newuserbutton}</button>
				<p>{this.state.user}</p>
				{data}
			</div >

		);


	}


}