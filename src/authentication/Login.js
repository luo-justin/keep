import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import firebase from '../Firebase';
import Nav from '../components/Nav';
import Create from '../components/Create';

import M from 'materialize-css/dist/js/materialize.min.js';


class Login extends Component{
	constructor(props){
		super(props)
		this.ref = firebase.firestore().collection('cards');

		this.state = {
			email: '',
			password: '',
			isLoggedIn: '',
			validState: '',
			validMsg:  '',

		};

		firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    console.log("user is logged in")
	  } else {
	    // No user is signed in.
	   	console.log("no one is logged in")
	  }
	});
	}

	initModal() {
    document.addEventListener('DOMContentLoaded', function() {
    console.log("Wtf212");
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, []);
    });
  }

	onChange = (e) =>{
		const state = this.state;
		state[e.target.id] = e.target.value;
		this.setState(state);
		this.setState({
					validMsg: "",
					validState: ""
			});	



	}

	onSubmit = (e) =>{
		e.preventDefault();
		const email = this.state.email;
		const pass = this.state.password;
		const auth = firebase.auth(); 
		//Sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise
		.then((res)=>{
			console.log("hello:")
			console.log(this.state);
			this.props.history.push('/');

		})
		.catch((e) => {
					this.setState({
					validMsg: e.message,
					validState: "invalid"
			});	

			console.log(e.message);

	});
	}

	componentDidMount(){
		this.initModal();
	}

	render(){

		const validState = this.state.validState;
		const validMsg = this.state.validMsg;

		return (
			<div>
				<Nav/>
				<Create userId="none"/>
				<div class="container">
					<div style={{"height": "24px"}}></div>
					<div class="row" >
						<div class="col l8 push-l2">
							<div class="card-panel white">
								<h4>Login</h4>
								<div class="row">
								   <form class="col s12" onSubmit={this.onSubmit}>
								      <div class="row">
								        <div class="input-field col s12">
								          <input id="email" type="text" class={validState} onChange={this.onChange}/>
								          <label for="email">Email</label>
								          <span class="helper-text" data-error={validMsg}></span>

								        </div>
								        <div class="input-field col s12">
								          <input id="password" type="password" class={validState} onChange={this.onChange}/>
								          <label for="password">Password</label>
								          <span class="helper-text" data-error={validMsg}></span>
								        </div>
								      </div>
								      <button class="btn-large waves-effect waves-light" type="submit" name="action">Login
										  </button>
										  <div class="center">
										  	<p>Don't have an account?</p>
										  	<Link class="waves-effect waves-light btn" to="/signup">Sign Up</Link>
										  </div>
								   </form>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>);
	}
}


export default Login;	