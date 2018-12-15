import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';


class Nav extends Component{
	constructor(props){
		super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
		
		this.state = {
			isLoggedIn: false
		};

	}

	addUserListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.setState({isLoggedIn: true})
      } else {
        // No user is signed in.
       this.setState({isLoggedIn: false})
      }
    });
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
    firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	  console.log("logged out");
	}).catch(function(error) {
	  // An error happened.
	});
  }

  componentDidMount(){
  	this.addUserListener();
  }

  loadUserName(){
  	if(this.props.userId == "none"){
  		return "";
  	}
  	return this.props.userId;

  }



 
	

	render(){
		const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <Link class="waves-effect waves-light modal-trigger" to="/" onClick={this.handleLogoutClick}>Logout</Link>;
    } else {
      button = <Link class="waves-effect waves-light" to="/login">Login</Link>;
    }

		return(  
		<nav>
		    <div class="nav-wrapper container">
		      <Link to="/" class="brand-logo">Keep</Link>
		      <ul id="nav-mobile" class="right hide-on-med-and-down">
		        <li><a class="waves-effect waves-light modal-trigger" href="#createModal">Create</a></li>
		        <li>{button}</li>
		        <li style={{"fontSize": "12px"}}>{this.loadUserName()}</li>

		      </ul>
		    </div>
	  	</nav>
	  );
	}
}
export default Nav;