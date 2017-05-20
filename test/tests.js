'use strict';

import React from "react";  
import ReactDOM from "react-dom"; 


// import AppBar from 'material-ui/AppBar';
// import axios from 'axios';
// import annyang from 'annyang';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import Snackbar from 'material-ui/Snackbar';

var ReactTestUtils = require('react-dom/test-utils');
// var App = require('../react-client/src/App.jsx');
var Header = require('../react-client/src/components/Header.jsx');
var SearchBar = require('../react-client/src/components/SearchBar.jsx');

var RaisedButton = require('./node_modules/material-ui/RaisedButton/index.js');


describe('Header should be imported and be an element', function () {
  it('Header should be an element', function (done) {
    ReactTestUtils.isElement(<Header />).should.equal(true);
    done();
  });
});

describe('SearchBar should be imported and be an element', function () {
  it('SearchBar should be an element', function (done) {
    ReactTestUtils.isElement(<SearchBar />).should.equal(true);
    done();
  });
});

// describe('SearchBar should be imported and be an element', function () {
//   it('SearchBar should be an element', function (done) {
//     const node = RaisedButton.refs.raisedButton;
//     ReactTestUtils.Simulate.click(node);
//     // ReactTestUtils.isElement(<SearchBar />).should.equal(true);
//     done();
//   });
// });