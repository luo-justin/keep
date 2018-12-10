import React, {Component} from 'react';


class Create extends Component{
	constructor(props){
		super(props)
		this.state = {

		};
	}

	onChange = (e) =>{
		
	}

	render(){
		return (
			<div id="modal1" class="modal">
		    <div class="modal-content">
		      <h4 style={{paddingBottom: "24px"}}>Create a Task</h4>
		      <div class="row">
		        <form class="col s12">
				      <div class="input-field col s6">
			          <input placeholder="Grocery shopping" id="first_name" type="text" class="validate"/>
			          <label for="first_name">Title</label>
		        	</div>
		        	<div class="input-field col s6">
			          <input placeholder="Buy two eggs" id="first_name" type="text" class="validate"/>
			          <label for="first_name">Description</label>
		        	</div>
	        	</form>
        	</div>
		    </div>
		    <div class="modal-footer">
		      <a href="#!" class="modal-close waves-effect waves-red btn-flat">Cancel</a>
		      <a href="#!" class="waves-effect waves-green btn-flat">Add Task</a>
		    </div>
		  </div>);
	}
}


export default Create;