import React, {Component} from 'react';


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
		      <a href="#" class="brand-logo">Keep</a>
		      <ul id="nav-mobile" class="right hide-on-med-and-down">
		        <li><a class="waves-effect waves-light btn modal-trigger" href="#createModal">Create</a></li>
		        <li><a class="waves-effect waves-light btn modal-trigger" href="#loginModal">Login</a></li>
		      </ul>
		    </div>
	  	</nav>
	  );
	}
}
export default Nav;