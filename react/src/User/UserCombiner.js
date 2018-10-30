import React, { Component } from 'react';
import Login from './login';
import Createuser from './CreateUser';
import Style from './userstyle';
import BStyle from '../basicStyle';

export default class UserCombiner extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newUser: false,
			logedin: false,
			newuserbutton: "Create Account",
			user: ""
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
					newuserbutton: "Create Account"
				});
			}
		});
	}
	backtologin = (res) => {
		this.setState({
			newUser: false,
			user: res
		});
	}
	logedin = () => {
		//kirjauduttu sisään
		//console.log("logedin");
		this.props.logedinHandler();
	}
	render() {
		let form;
		if (this.state.newUser) {
			form = <Createuser backtologin={this.backtologin.bind(this)} />;
		} else {
			form = <Login newuserbutton={this.handlenewuser.bind(this)} logincallback={this.logedin.bind(this)} />;
		}
		return (
			<div>
				<div style={Style.mainbackground}>
					{form}
				</div>
				<p >{this.state.user}</p>
				<button onClick={this.handlenewuser} style={BStyle.topRight}>{this.state.newuserbutton}</button>
			</div >

		);


	}


}