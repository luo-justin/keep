import React, {Component} from 'react';
import firebase from '../Firebase';
import M from 'materialize-css/dist/js/materialize.min.js';

class Edit extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: '',
			description: '',
			timestamp: '',
			cid: '',
		}
		this.ref = firebase.firestore().collection('user').doc(this.props.userId).collection("cards").doc(this.props.cid);

	}

	addUserListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("change detected:");
        console.log(user);
        user.providerData.forEach((profile) => {
					this.ref = firebase.firestore().collection('user').doc(profile.email).collection("cards").doc(this.props.cid);
        });
      } else {
        // No user is signed in.
        this.ref();
      }
    });
  }



	componentDidMount(){
		this.addUserListener();
		this.ref.get().then((doc) => {
		    if (doc.exists) {
		        const data = doc.data();
		        console.log(this);
		        this.setState({
		        	title: data.title,
		        	description: data.description,
		        	timestamp: data.timestamp,
		        	cid: '',
		        });
		    } else {
		        // doc.data() will be undefined in this case
		        console.log("No such document!");
		    }
		}).catch(function(error) {
		    console.log("Error getting document:", error);
		});

		var elem = document.getElementById("editModal" + this.props.cid);
    var instances = M.Modal.init(elem, []);
    M.updateTextFields()
}

onChange = (e) => {
	const state = this.state;
	state[e.target.id] = e.target.value;
	this.setState({state});
}

onSubmit = (e) =>{
	e.preventDefault();
	const { title, description, timestamp} = this.state;
	const updateRef = this.ref;
	updateRef.set({
		title,
		description,
		timestamp,
	}).then((docRef) => {
			this.setState({
				title: title,
				description: description,
				timestamp: timestamp,
			});
			//close the modal
			var modal = "editModal" + this.props.cid;
			var instance = M.Modal.getInstance(document.getElementById(modal));
			instance.close();
	}).catch((error) =>{
		console.log("Error Updating Document");
	});

}


render(){
	const { title, description, timestamp, cid} = this.state;
	return(
		<div>
			<div id={"editModal" + this.props.cid} class="modal">
					<form onSubmit={this.onSubmit}>
				    <div class="modal-content">
				      <h4 style={{paddingBottom: "24px"}}>Edit a Task</h4>
				      <div class="row">
					      <div class="input-field col s6">
				          <input placeholder="Grocery shopping" id="title" value={title} onChange={this.onChange} type="text" />
				          <label for="title">Title</label>
			        	</div>
			        	<div class="input-field col s6">
				          <input placeholder="Buy two eggs" id="description" value={description} onChange={this.onChange} type="text" />
				          <label for="description">Description</label>
			        	</div>
		        	</div>
				  	</div>
				  	<div class="modal-footer">
					      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>
					      <button type="submit" class="waves-effect waves-green btn-flat">Add Task</button>
					    </div>
			  	</form>
			  </div>
		  </div>
		);
}

}

export default Edit;











