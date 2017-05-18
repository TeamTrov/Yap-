import React from 'react';
import render from 'react-dom';
import styles from '../css/styles';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
    <section id="header" style={styles.Header}>
    <img src="yapLogo.png"></img>
    </section>
    )
  }
}

//  <img src="../images/trov_logo.png" />
