import React, { Component } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';
import Create from './components/Create';
import Edit from './components/Edit';
import Delete from './components/Delete';
import firebase from './Firebase';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: 'none',
      cards: []
    }
    this.ref = null;
    this.unsubscribe = null;

  }


  addUserListener(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log("change detected:");
        console.log(user);
        user.providerData.forEach((profile) => {
          this.ref = firebase.firestore().collection('user').doc(profile.email).collection("cards");
          this.setState({userId: profile.email});
          console.log("Called pls")
          this.ref.onSnapshot(this.onCollectionUpdate);
        });
        
      } else {
        // No user is signed in.
        console.log("no one loggedin");
        this.setState({userId: 'none', cards: []});
        //unsubscribe
        if(this.ref){
          this.ref();
          this.ref = null;
        }
        console.log(this.state);
      }
    });
  }


  
  initModal() {
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, []);
    });
  }

  onCollectionUpdate = (querySnapShot) =>{
    const cards = [];
    console.log("collection updated");
    console.log(querySnapShot);

    querySnapShot.forEach(function(doc){
      console.log("plsplspls");
      const {title, description, timestamp} = doc.data();
      cards.push({
        title: title,
        description: description,
        timestamp: timestamp, 
        cid: doc.id,
      });

    }, function(error) {
        console.log("Error: " + error);
    });
    
    this.setState({cards: cards});
    console.log(cards);

  }

  componentDidMount(){
    console.log("component mounted");
    this.addUserListener();
    this.initModal();
  }

  render() {
    return (
      <div class="">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <Nav/>
        <Create userId={this.state.userId}/>
        {this.state.cards.map(card =>  <Edit key={card.cid} cid={card.cid} /> )}
        {this.state.cards.map(card =>  <Delete key={card.cid} cid={card.cid} /> )}
        <div class="container" style={{marginTop: "24px"}}>
          <div class="row">
            {this.state.cards.map(card =>  <Card key={card.cid} data={card} /> )}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
