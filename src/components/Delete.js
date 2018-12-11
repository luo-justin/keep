import React, {Component} from 'react';
import firebase from '../Firebase';
import M from 'materialize-css/dist/js/materialize.min.js';

class Delete extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			description: '',
			timestamp: '',
			cid: '',
		}

	}

   

componentDidMount(){
	var elem = document.getElementById("deleteModal" + this.props.cid);
    var instances = M.Modal.init(elem, []);
}

onSubmit = (e) =>{
	e.preventDefault();
	const { title, description, timestamp} = this.state;
	const deleteRef = firebase.firestore().collection("cards").doc(this.props.cid);
	deleteRef.delete().then(function() {
    	console.log("Document successfully deleted!");
	})
	.catch(function(error) {
	    console.error("Error removing document: ", error);
	});


}


render(){
	const { title, description, timestamp, cid} = this.state;

	return(
		<div>
			<div id={"deleteModal" + this.props.cid} class="modal">
					<form onSubmit={this.onSubmit}>
				    <div class="modal-content">
      					<h5 class="center">Are you sure you want to delete this task?</h5>
				  	</div>
				  	<div class="modal-footer">
					      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>
					      <button type="submit" class="waves-effect waves-green btn-flat">Confirm</button>
					</div>
			  	</form>
			  </div>
		  </div>
		);
}

}

export default Delete;











