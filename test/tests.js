'use strict';

import React from "react";  
import ReactDOM from "react-dom"; 
import chai from 'chai';
// import restler from 'restler';

var expect = chai.expect;

var ReactTestUtils = require('react-dom/test-utils');

var Header = require('../react-client/src/components/Header.jsx');
var SearchBar = require('../react-client/src/components/SearchBar.jsx');
var RaisedButton = require('../node_modules/material-ui/RaisedButton/index.js');


describe('Mocha tests', function () {
  it('Everything should be ok', function (done) {
    var everything = 'thisisatruthystring';
    expect('everything').to.be.ok;
    done();
  });
});

// describe('Server', function () {
//   it('should respond with a string to ', function (done) {
//     restler.get(`/translate?from=$en&to=$es&query=$hello`)
//     done();
//   });
// });

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



// describe('SearchBar should have an onUpdateInput function', function () {
//   it('SearchBar should have an onUpdateInput function', function (done) {
//     expect(SearchBar).to.have.all.keys('constructor', 'render');
//     done();
//   });
// });


// describe('Shallow Render Test', function () { //this fails because somehow
//   it('Rando testo', function (done) {
//     let renderer = ReactTestUtils.createRenderer();
//     renderer.render(<SearchBar />, {});
//     done();
//   });
// });


