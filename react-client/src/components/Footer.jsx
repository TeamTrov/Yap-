import React from 'react';
import render from 'react-dom';
import styles from '../css/styles';

export default class Footer extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
    <section id="footer" style={styles.Footer}>
      <p style={styles.Footer}>&copy;2017 Brandon Brown, Jake Holtz, Ashwin Narasimhan, Jon Stewart. All Rights Reserved</p>
    </section>
    )
  }
}
