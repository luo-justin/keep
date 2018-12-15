import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

export default class Empty extends Component{

	render(){
		const isLoggedIn = this.props.isLoggedIn;
		if(isLoggedIn){
		return (<div class="center">
					<div style={{height: "24px"}}></div>
					<img class="center" width="300" height="300" src="https://firebasestorage.googleapis.com/v0/b/keep-93740.appspot.com/o/sadporo.png?alt=media&token=e5d9bc4e-d58e-4fa0-ae48-f46d8de75079"/>
					<h4 class="center" style={{fontWeight: "300"}}>No current tasks.</h4>
					</div>
			);
		}
		return(<div class="center">
					<div style={{height: "24px"}}></div>
					<img class="center" width="300" height="300" src="https://firebasestorage.googleapis.com/v0/b/keep-93740.appspot.com/o/coolpoeo.png?alt=media&token=6cc3e238-35b5-4b5b-97a0-43629346510b"/>
					<h4 class="center" style={{fontWeight: "300"}}>Login to make a task!</h4>
					</div>

			);
		

	}



}