import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Edit from './Edit';
import M from 'materialize-css/dist/js/materialize.min.js';


class Card extends Component{
	constructor(props){
		super(props);
		this.state = {
			
		};


	}

	render(){
		const {title, description, timestamp, cid} = this.props.data;
		return(  
			<div>
			    <div class="col s12 m6 l4">
			      <div class="card blue-grey darken-1">
			        <div class="card-content white-text">
			          <span class="card-title">{title}</span>
			          <p>{description}</p>
			        </div>
			        <div class="card-action">
			          <a href="#">Delete</a>
  					  <a class="modal-trigger" href={"#editModal" + cid}>Modal</a>
			        </div>
			      </div>
			    </div>
		    </div>

	  );
	}


}
export default Card;