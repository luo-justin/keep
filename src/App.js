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
    this.ref = firebase.firestore().collection('boards');
    this.initModal();
  }

  initModal() {
    document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, []);
    });
  }

  render() {
    return (
      <div class="">
        <Nav/>
        <Create/>
        <div class="container">
          <div class="row">
            <Card/>
            <Card/>
            <Card/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
