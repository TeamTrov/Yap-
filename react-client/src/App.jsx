import React from 'react';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import annyang from 'annyang';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Snackbar from 'material-ui/Snackbar';
import SearchBar from './components/SearchBar';
import MenuBar from './components/MenuBar';
import MainDisplay from './components/MainDisplay';
import LoadingScreen from './components/LoadingScreen';
import FavoriteView from './components/FavoriteView';
import HelpSection from './components/HelpSection';
import Gmap from './components/Gmap';
import TranslateView from './components/TranslateView';
import languages from './assets/languageList.js'
import styles from './css/styles';

injectTapEventPlugin();

const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  });
});

const getLanguageCode = (chosenLanguage) => {
  console.log('called getLanguageCode');
  var newCode = languages["langToCode"][chosenLanguage]
  return newCode;
}

const getLanguage = (code) => {
  console.log('called getLanguage');
  var lang = languages["codeToLang"][code];
  return lang;
}

const whichUser = (u) => {
  console.log('WHOSE THE USER?');
  console.log(u);
}


let location = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FBMessage: undefined,
      data: undefined,
      favData: undefined,
      delItem: undefined,
      favView: false,
      mainView: true,
      mapView: false,
      // helpView: false,
      helpToggle: false,
      leftMenu: false,
      isLoading: true,
      isLogin: false,
      snackBarAdd: false,
      snackBarRemove: false,
      lat: undefined,
      lng: undefined,
      // translation info
      translateView: false,
      translateFromLang: 'en',
      translateToLang: '',
      translateOldPhrase: '',
      translateNewPhrase: '',
      // FB profile info
      userNameFB: this.props.userName,
    };
    this.menuOpen = this.menuOpen.bind(this);
    this.search = this.search.bind(this);
    this.clickFav = this.clickFav.bind(this);
    this.clickMain = this.clickMain.bind(this);
    this.clickHelp = this.clickHelp.bind(this);
    this.saveToFavorite = this.saveToFavorite.bind(this);
    this.handleSnackAdd = this.handleSnackAdd.bind(this);
    this.removeFromFavorite = this.removeFromFavorite.bind(this);
    this.handleSnackRemove = this.handleSnackRemove.bind(this);
    this.speechRemoveHandler = this.speechRemoveHandler.bind(this);
    this.speechRemove = this.speechRemove.bind(this);
    this.handleFBPost = this.handleFBPost.bind(this);
    this.clickTranslate = this.clickTranslate.bind(this);
    this.updateTranslateTo = this.updateTranslateTo.bind(this);
    this.clickTravel = this.clickTravel.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
    // this setTimeout is absolutely needed to correctly pool the coordinates
    // before user's interaction
    setTimeout(() => {
      this.setState({
        isLoading: false,
      }, this.setState({ mapView: true }));
    }, 2000);
    getCoords().then((response) => {
      this.setState({
        lat: response.lat,
        lng: response.long,
      }, () => axios.post('/location', response));
    });
  }

  componentDidMount() {
    if (annyang) {
      const commands = {
        'show me *input': this.search,
        'post to facebook *inputo': this.handleFBPost,
        'go to favorites': this.clickFav,
        'go to front': this.clickMain,
        'help me': this.clickHelp,
        'translate *input': this.clickTranslate,
        'update language to *input': this.updateTranslateTo,
        'travel to *input': this.clickTravel,
        'save to favorites': () => {
          this.saveToFavorite(this.state.data);
        },
        'remove from favorites': this.speechRemove,
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }

    this.welcomeMessage();
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     userNameFB: newProps.userName,
  //   });
  //   whichUser(this.state.userName);
  // }

  // welcome pop up message
  welcomeMessage() {

    setTimeout( () => {
      console.log('WELCOME TO YAP+');
      let currentUser = this.state.userNameFB;
      // var that = this
      this.setState({
        snackBarAdd: !this.state.snackBarAdd,
        FBMessage: currentUser ? `Welcome to Yap+ , ${currentUser}!` : "no message!"
      });
    }, 2000);

    setTimeout(function() {
      this.setState({
        FBMessage: undefined
      })
    }, 4000);
  }

  // function to handle add to DB
  saveToFavorite(data) {
    console.log('SAVE TO FAVORITES WORKS', data);
    if (data.address) {
      axios.post('/storage', data)
      .then(this.handleSnackAdd);
    }
  }

  // function to handle remove from DB
  removeFromFavorite(data) {
    console.log('REMOVE FROM FAV WORKS', data._id);
    axios.post('/storage/remove', data)
    .then(this.handleSnackRemove)
    .then(() => {
      const newFav = this.state.favData.filter(rem => rem._id !== data._id);
      this.setState({
        favData: newFav,
      });
    });
  }

  // feed item onto state.delItem from child
  speechRemoveHandler(data) {
    this.setState({ delItem: data });
  }

  // this is to be called by speech to handle the actual removal
  // this is absolutely needed to deal with async nature of setState
  speechRemove() {
    this.setState(() => this.removeFromFavorite(this.state.delItem));
  }

  handleFBPost(inputo) {
    var that = this
    this.setState({
      snackBarAdd: !this.state.snackBarAdd,
      FBMessage: inputo ? 'Posted to Facebook: '+ inputo : "no message!"
    });

    setTimeout(function() {
      that.setState({
        FBMessage: undefined
      })
    }, 4000);
  }

  // snack is the popup bars on add and remove
  handleSnackAdd() {
    this.setState({
      snackBarAdd: !this.state.snackBarAdd,
    });
  }

  handleSnackRemove() {
    this.setState({
      snackBarRemove: !this.state.snackBarRemove,
    });
  }

  clickTravel(input) {
    console.log(`The current lat/lng: ${this.state.lat}/${this.state.lng}`);
    console.log(`You are now traveling to ${input}!`);
    // hagerstown, md: 39.679136, -77.708215

    // var that = this
    this.setState({
      snackBarAdd: !this.state.snackBarAdd,
      FBMessage: input ? 'Now taking you to: '+ input : "no message!"
    });

    setTimeout( () => {
      this.setState({
        FBMessage: undefined
      })
    }, 4000);

    this.changeLocation(input);
  }

  // update lat/lng with new location
  changeLocation(newLocation) {
    console.log('OKAY WE TELEPORTIN NOW');
    console.log('search: ', newLocation);

    axios.post(`/changeLocation?destination=${newLocation}`)
    .then((response) => {
      // console.log(response.data[0]);
      let latitude = response.data[0].latitude;
      let longitude = response.data[0].longitude;

      var updateLoc = {
        lat: latitude,
        long: longitude,
      }

      this.setState({
        lat: latitude,
        lng: longitude,
      }, () => axios.post('/location', updateLoc));
      console.log(`The updated lat/lng: ${this.state.lat}, ${this.state.lng}`);
    });
  }

  updateTranslateTo(input) {
    console.log(`Updating destination translate language to: ${input}`);
    var langCode = getLanguageCode(input);
    console.log(this);
    this.setState({
      translateToLang: langCode,
      translateOldPhrase: '',
      translateNewPhrase: ''
    });

    var that = this
    this.setState({
      snackBarAdd: !this.state.snackBarAdd,
      FBMessage: input ? 'Now translating to: '+ input : "no message!"
    });

    setTimeout(function() {
      that.setState({
        FBMessage: undefined
      })
    }, 4000);
  }

  // added handler for Google Translate
  clickTranslate(input) {

    this.setState({
      translateView: true,
      mapView: false
    });

    var phrase = input;
    var fromLang = this.state.translateFromLang;
    var toLang = this.state.translateToLang;

    this.setState({
      translateOldPhrase: phrase,
    })

    console.log('Translate search using input: ', phrase);

    axios.get(`/translate?from=${fromLang}&to=${toLang}&query=${phrase}`)
    .then((response) => {
      console.log('GOOGLE TRANSLATE API...');
      console.log(`From ${fromLang}:${phrase} => ${toLang}:${response.data}`);

      this.setState({
        translateNewPhrase: response.data,
        mainView: false
      }, () => {
        this.setState({
          leftMenu: false,
        })
      })
    })
    // .then(this.setState({ isLoading: false }))
    .catch((error) => {
      if (error) {
        this.setState({
          isLoading: false,
        });
      }
      console.warn(error);
    });
  }

  // handler for menu click/speech control on Favorites
  clickFav() {
    this.setState({
      isLoading: true,
      mapView: false,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 200);
    console.log('FAV CLICKY');
    axios.get('/storage/retrieve')
    .then((response) => {
      console.log('RESPONSE DATA IS ', response.data);
      if (response.data.length > 0) {
        this.setState({
          favView: true,
          mainView: false,
          favData: response.data,
        });
      } else {
        this.setState({
          favView: true,
        });
      }
    })
    .catch((error) => {
      console.warn('cannot retrieve fav', error);
    });
  }

  // handler for menu click/speech control on Main
  clickMain() {
    console.log('MAIN CLICKY');
    this.setState({
      isLoading: true,
      mapView: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 400);
    this.setState({
      mainView: true,
      favView: false,
    });
    // add state changes
    this.setState({
      translateView: true,
    });
  }

  // handler for menu click/speech control on Help section
  clickHelp() {
    whichUser(this.state.userNameFB);
    this.setState({
      helpToggle: !this.state.helpToggle,
    });
  }

  // check login status if needed
  checkStatus() {
    if (!this.state.isLogin) {
      this.loginFB();
    }
  }

  search(input) {
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1500);
    console.log('search: ', input);
    axios.get(`/search?query=${input}`)
    .then((response) => {
      console.log('RES DATA API IS', response.data);
      this.setState({
        data: response.data,
      }, () => this.setState({
        lat: response.data.lat,
        lng: response.data.lng,
      }));
    })
    .then(
      this.setState({
        favView: false,
        mainView: true,
      }, this.setState({ mapView: true })),
    )
    // .then(this.setState({ isLoading: false }))
    .catch((error) => {
      if (error) {
        this.setState({
          isLoading: false,
        });
      }
      console.warn(error);
    });
  }

  menuOpen() {
    this.setState({
      leftMenu: !this.state.leftMenu,
    });
  }

  render() {
    // condRender is conditional render value
    // this will determine what will be rendered to accomodate
    // for different views based on menu clicks
    // WARNING: be careful when edit condRender
    // failed to properly handle logics will break the render
    const isLoading = this.state.isLoading;
    const isMainView = this.state.mainView;
    const isFavView = this.state.favView;
    const isData = this.state.data;
    const isMapView = this.state.mapView;
    // translate
    const isTranslateView = this.state.translateView;

    let condRender;
    let condMap;
    if (isFavView && !isMainView) {
      condRender = (
        <FavoriteView
          speechRemoveHandler={this.speechRemoveHandler}
          onRemove={this.removeFromFavorite}
          favData={this.state.favData}
        />
      );
    } else if (isFavView && isMainView) {
      condRender = (
        <div>
          <h1>:( You need some Favorites yooo!!!)</h1>
        </div>
      );
    } else if (isLoading) {
      condRender = <LoadingScreen />;
    } else if (isData && isMainView) {
      condRender = (
        <div>
          <MainDisplay
            style={{ 'margin-top': '20px' }}
            data={this.state.data}
            onSave={this.saveToFavorite}
          />
        </div>
      );
    // check if translate view state is set to true
    } else if (isTranslateView && !isMainView) {
      var f = this.state.translateFromLang;
      var t = this.state.translateToLang
      var fromThing = getLanguage(f);
      var toThing = getLanguage(t);

      condRender = (
        <div>
          <TranslateView
            translateOldPhrase={this.state.translateOldPhrase}
            translateNewPhrase={this.state.translateNewPhrase}
            translateFromLang={fromThing}
            translateToLang={toThing}
            />
        </div>
      );

    } else if (!isData && isMainView) {
      condRender = (null);
    }
    if (isMapView) {
      condMap = (
        <div style={styles.gmap}>
          <Gmap
            data={this.state.data}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        </div>
      );
    }

    return (
      <MuiThemeProvider>
        <div id="YapPlus">
          <AppBar
            title="Yap+"
            style={{
              backgroundColor: '#FFA726',
              fontFamily: `"Verlag A", "Verlag B"`,
              fontWeight: '700',
              fontStyle: 'normal' }}
            onLeftIconButtonTouchTap={this.menuOpen}
          />
          <SearchBar
            startSpeech={this.startSpeech}
            onSearch={this.search}
          />
          {condMap}
          <MenuBar
            leftMenuStatus={this.state.leftMenu}
            onMenuOpen={this.menuOpen}
            checkLogin={this.checkLoginState}
            onClickHelp={this.clickHelp}
            onClickMain={this.clickMain}
            onClickFav={this.clickFav}
            onClickTranslate={this.clickTranslate}
            {...this.props}
          />
          <HelpSection
            helpToggle={this.state.helpToggle}
            clickHelp={this.clickHelp}
          />
          {condRender}
          <Snackbar
            open={this.state.snackBarAdd}
            message={this.state.FBMessage ? this.state.FBMessage : "Added to your Favorites"}
            autoHideDuration={4000}
            onRequestClose={this.handleSnackAdd}
          />
          <Snackbar
            open={this.state.snackBarRemove}
            message="Item Removed!!"
            autoHideDuration={4000}
            onRequestClose={this.handleSnackRemove}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
