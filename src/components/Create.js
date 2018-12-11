import React, {Component} from 'react';
import firebase from '../Firebase';
import M from 'materialize-css/dist/js/materialize.min.js';


class Create extends Component{
	constructor(props){
		super(props)
		this.ref = firebase.firestore().collection('cards');

		this.state = {
			title: '',
			description: '',
			timestamp: '',
		};
	}

	onChange = (e) =>{
		const state = this.state;
		state[e.target.id] = e.target.value;
		this.setState(state);

	}

	onSubmit = (e) =>{
		e.preventDefault();
		var timeStamp = Math.floor(Date.now() / 1000);
		const { title, description, timestamp} = this.state;
		this.ref.add({
			title: title,
			description: description,
			timestamp: timeStamp,
			cid: '',
		}).then((docRef) => {
			this.setState({
				title: '',
		        description: '',
		        author: '',
		        cid: '',
			});

			//close the modal
			var instance = M.Modal.getInstance(document.getElementById("createModal"));
			instance.close();
		})
		.catch((error) => {
      console.error("Error adding document: ", error);
    });

	}

	render(){
		const { title, description, timestamp, cid} = this.state;
		return (
			<div id="createModal" class="modal">
				<form onSubmit={this.onSubmit}>
			    <div class="modal-content">
			      <h4 style={{paddingBottom: "24px"}}>Create a Task</h4>
			      <div class="row">
				      <div class="input-field col s6">
			          <input required placeholder="Grocery shopping" id="title" value={title} onChange={this.onChange} type="text" />
			          <label for="title">Title</label>
		        	</div>
		        	<div class="input-field col s6">
			          <input required placeholder="Buy two eggs" id="description" value={description} onChange={this.onChange} type="text" />
			          <label for="description">Description</label>
		        	</div>
	        	</div>
			  	</div>
			  	<div class="modal-footer">
				      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>
				      <button type="submit" class="waves-effect waves-green btn-flat">Add Task</button>
				    </div>
		  	</form>
		  </div>);
	}
}


export default Create;