import React, { Component } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';
import Create from './components/Create';

import firebase from './Firebase';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


class App extends Component {
  constructor(props){
    super(props);
    this.ref = firebase.firestore().collection('cards');
    this.initModal();

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
      });
    });
    this.setState({cards: cards});
  }

  componentDidMount(){
    this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="">
        <Nav/>
        <Create/>
        <div class="container">
          <div class="row">
            {this.state.cards.map(card =>  <Card data={card} />)}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
