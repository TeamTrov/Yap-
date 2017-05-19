// reusable component for Facebook login

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Header from './components/Header';
import FacebookLogin from './components/FacebookLogin';
import Footer from './components/Footer';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.logoutFB = this.logoutFB.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '1909507675963563', //your fb api key here
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });
      FB.getLoginStatus((response) => {
        this.statusChangeCallback(response);
      });
    };

  // Load the SDK asynchronously
    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  testAPI() {
    console.log('Fetching info from Facebook API ');
    FB.api('/me', (response) => {
      console.log(`Successful login for: ${response.name}`);
    });
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      this.loginFB();
    } else {
      this.loginFB();
    }
  }

  checkLoginState() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response);
      if (response.status === 'connected') {
        this.setState({
          isLogin: true,
        });
      }
    });
  }

  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', (response) => {
          console.log(`FB Login, username: ${response.name}.`);
          this.setState({
            isLogin: true,
          });
        });
      } else {
        console.log('User cancelled');
      }
    });
  }

  logoutFB() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const access_token = window.localStorage.getItem('fb_access_token');
        FB.logout(() => {
          console.log('FB logout');
          this.setState({
            isLogin: false,
          });
        });
        window.localStorage.removeItem('fb_access_token');
      }
    });
  }

  render() {
    const isLogin = this.state.isLogin;
    return (
      <div>
        {!isLogin ? (
          <div>
            <Header />
            <FacebookLogin
              loginFB={this.loginFB}
              checkLoginState={this.checkLoginState}
            />
          <Footer />
          </div> ) : (
            <App
              checkLoginState={this.checkLoginState}
              loginFB={this.loginFB}
              logoutFB={this.logoutFB}
            />
          )}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
