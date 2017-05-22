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
      profileName: 'FB username'
    };
    this.checkLoginState = this.checkLoginState.bind(this);
    this.loginFB = this.loginFB.bind(this);
    this.logoutFB = this.logoutFB.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: '1909507675963563', // trov fb api key
        // appId: '1305613922867281', //your fb api key here
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

  updateName(nameInfo) {
    console.log('previous user:', this.state.profileName);
    this.setState({
      profileName: nameInfo
    });
    console.log('updated user:', this.state.profileName);
  }

  testAPI() {
    console.log('Fetching info from Facebook API ');
    FB.api('/me', 'get', { fields: 'id,name,timezone' }, (response) => {
      var profileName = response.name;
      console.log(`Successful login for: ${profileName}`);
      // console.log('tzone: ', response.timezone);
      // console.log('token: ', window.localStorage.getItem('fb_access_token'))
      this.updateName(profileName);
    });
  }

  statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);
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
      this.testAPI();
      this.statusChangeCallback(response);
      if (response.status === 'connected') {
        var name = response.name;
        console.log(`Successful login for: ${name}`);
        // this.updateName(name);

        this.setState({
          isLogin: true,
        });
      }
    });
  }

/////////////about to rewrite loginFB


  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', 'get', { fields: 'id,name,timezeone' }, (response) => {
          // var profileName = response.name;
          // this.updateName(profileName);
          // console.log(`Successful login for: ${name}`);
          console.log('logging in.....');
          this.setState({
            isLogin: true,
          });
        });
      } else if (err) {
        console.log('User cancelled');
      }
    }
//      , {
//       scope: 'publish_actions',
//       return_scopes: true
//     }
   );
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
              userName={this.state.profileName}
            />
          )}
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('main'));
