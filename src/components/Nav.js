import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Nav extends Component{
	constructor(props){
		super(props);
		
		this.state = {

		};

	}

	render(){
		return(  
		<nav>
		    <div class="nav-wrapper container">
		      <Link to="/" class="brand-logo">Keep</Link>
		      <ul id="nav-mobile" class="right hide-on-med-and-down">
		        <li><a class="waves-effect waves-light modal-trigger" href="#createModal">Create</a></li>
		        <li><Link class="waves-effect waves-light modal-trigger" to="/login">Login</Link></li>
		      </ul>
		    </div>
	  	</nav>
	  );
	}
}
export default Nav;