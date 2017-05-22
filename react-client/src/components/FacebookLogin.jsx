import React from 'react';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const facebookIcon = require('../assets/facebookIcon/facebookSignin.png');

const FacebookLogin = props => (
  <div style={styles.splash}>
    <h3 style={styles.tagline}>Yap. Plus more. Try it today.</h3>
    <img
      style={styles.FacebookLogin}
      onClick={props.loginFB}
      src={facebookIcon}
      alt="Facebook Logo"
    />
  </div>
);

FacebookLogin.propTypes = {
  loginFB: PropTypes.func,
};

FacebookLogin.defaultProps = {
  loginFB: PropTypes.func,
};

export default FacebookLogin;
