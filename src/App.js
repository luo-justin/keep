import React, { Component } from 'react';
import Nav from './components/Nav';
import Card from './components/Card';
import Create from './components/Create';

import Firebase from './Firebase';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


class App extends Component {
  render() {
     document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, []);
  });
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
