import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import firebase from '../Firebase';
import Nav from '../components/Nav'
import M from 'materialize-css/dist/js/materialize.min.js';


class SignUp extends Component{
	constructor(props){
		super(props)

		this.state = {
			name: '',
			email: '',
			password: '',
			isLoggedIn: '',
			validState: '',
			validMsg: '',
		};

		this.addListener();


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

	addListener(){
		console.log("this state: " + this.state.name);
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if(firebaseUser){
				if (firebaseUser != null) {
				  firebaseUser.providerData.forEach((profile) => {
				    console.log("Sign-in provider: " + profile.providerId);
				    console.log("  Provider-specific UID: " + profile.uid);
				    console.log("  Name: " + profile.displayName);
				    console.log("  Email: " + profile.email);
				    console.log("  Photo URL: " + profile.photoURL);
				    var userRef = firebase.firestore().collection('user').doc(profile.email);
				    console.log("stateeee");
				    userRef.set({
								name: this.state.name,
								email: profile.email,
								cid: '',
							}).then((docRef) => {  })
							.catch((error) => {
					      console.error("Error adding document: ", error);
					    });
				  });
				}
			}
			else{
				console.log("not logged in");
			}
		});
	}
	onSubmit = (e) =>{
		e.preventDefault();
		const email = this.state.email;
		const pass = this.state.password;
		const auth = firebase.auth(); 
		//Sign in
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch((e) =>{
			this.setState({
					validMsg: e.message,
					validState: "invalid"
		});	
		});

	}

	render(){
		const {name, email, password, isLoggedIn, validState, validMsg} = this.state; 
		return (
			<div>
				<Nav/>
				<div class="container">
					<div style={{"height": "24px"}}></div>
					<div class="row" >
						<div class="col l8 push-l2">
							<div class="card-panel white">
								<h4>Sign Up</h4>
								<div class="row">
								   <form class="col s12" onSubmit={this.onSubmit}>
								      <div class="row">
									      <div class="input-field col s12">
								          <input id="name" type="text" class="" value={name} onChange={this.onChange} required/>
								          <label for="name">Name</label>
									       </div>
								        <div class="input-field col s12">
								          <input id="email" type="text" class={validState} value={email} onChange={this.onChange} required/>
								          <label for="email">Email</label>
								          <span class="helper-text" data-error={validMsg}></span>
								        </div>
								        <div class="input-field col s12">
								          <input id="password" type="password" class={validState} value={password} onChange={this.onChange} required/>
								          <label for="password">Password</label>
								          <span class="helper-text" data-error={validMsg}></span>
								        </div>
								      </div>
								      <button class="btn-large waves-effect waves-light" type="submit" name="action">Register
										  </button>
										  <div class="center">
										  	<p>Already have an account?</p>
										  	<Link class="waves-effect waves-light btn" to="/login">Login</Link>
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


export default SignUp;	