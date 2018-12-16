import React, { Component } from 'react';
import Nav from './components/Nav';
import Empty from './components/Empty';
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
      cards: [],
      isLoading: true,
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
          this.ref.orderBy("timestamp", "desc").onSnapshot(this.onCollectionUpdate);
        });
        
      } else {
        // No user is signed in.
        console.log("no one loggedin");
        this.setState({userId: 'none', cards: [], isLoading: false});
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
    console.log("load em up");
    var instances = M.Modal.init(elems, []);
    });
  }

  onCollectionUpdate = (querySnapShot) =>{
    this.setState({isLoading: true});
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
    this.setState({isLoading: false});


  }

  componentDidMount(){
    this.addUserListener();
    this.initModal();
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, [])
  }

  isEmpty(){
    //TODO: check user loggin state as well
    const userId = this.state.userId;
    const cards = this.state.cards;
    const isLoading = this.state.isLoading;
    if(userId != "none"){
      if(cards.length == 0 && !isLoading){
        return <Empty isLoggedIn={true}/>;
        }
      return <div></div>;
    }
    else{
      if(!isLoading){
        return <Empty isLoggedIn={false}/>
      }
    }
  }

  render() {

    return (
      <div class="">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <Nav userId={this.state.userId}/>
        <Create userId={this.state.userId}/>
        {this.state.cards.map(card =>  <Edit key={card.cid} cid={card.cid} userId={this.state.userId}/> )}
        {this.state.cards.map(card =>  <Delete key={card.cid} cid={card.cid} userId={this.state.userId} /> )}
        <div class="container" style={{marginTop: "24px"}}>
          {this.isEmpty()}
          <div class="row">
            {this.state.cards.map(card =>  <Card key={card.cid} data={card} /> )}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
