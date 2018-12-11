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
			      <div class="card grey lighten-5 hoverable">
			        <div class="card-content black-text">
			          <span class="card-title">{title}</span>
			          <p style={{whiteSpace: "pre-wrap"}}>{description}</p>
			        </div>
			        <div class="card-action">
			          <a class="modal-trigger" href={"#deleteModal" + cid}><i class="material-icons left">delete</i></a>
  					  <a class="modal-trigger" href={"#editModal" + cid}><i class="material-icons right">edit</i></a>
			        </div>
			      </div>
			    </div>
		    </div>

	  );
	}


}
export default Card;