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
    this.ref = firebase.firestore().collection('cards');

    this.state = {
      cards: []
    }

  }
  
  initModal() {
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, []);
    });
  }

  onCollectionUpdate = (querySnapShot) =>{
    const cards = []
    querySnapShot.forEach(function(doc){
      const {title, description, timestamp} = doc.data();
      cards.push({
        title: title,
        description: description,
        timestamp: timestamp, 
        cid: doc.id,
      });

    });
    this.setState({cards: cards});

  }

  componentDidMount(){
    this.ref.onSnapshot(this.onCollectionUpdate);
    this.initModal();
  }

  render() {
    return (
      <div class="">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <Nav/>
        <Create/>
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
