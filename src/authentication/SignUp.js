import React, {Component} from 'react';
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
		};

		this.addListener();


	}

	onChange = (e) =>{
		const state = this.state;
		state[e.target.id] = e.target.value;
		this.setState(state);

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
		promise.catch(e => console.log(e.message));

	}

	render(){
		const {name, email, password, isLoggedIn} = this.state; 

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
								          <input id="name" type="text" class="validate" value={name} onChange={this.onChange}/>
								          <label for="name">Name</label>
									       </div>
								        <div class="input-field col s12">
								          <input id="email" type="text" class="validate" value={email} onChange={this.onChange}/>
								          <label for="email">Email</label>
								        </div>
								        <div class="input-field col s12">
								          <input id="password" type="text" class="validate" value={password} onChange={this.onChange}/>
								          <label for="password">Password</label>
								        </div>
								      </div>
								      <button class="btn-large waves-effect waves-light" type="submit" name="action">Register
										  </button>
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