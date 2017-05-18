import React from 'react';
import styles from '../css/styles';

class TranslateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateData: 'translation goes here',
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      translateOldPhrase: newProps.translateOldPhrase,
      translateNewPhrase: newProps.translateNewPhrase,
      translateFromLang: newProps.translateFromLang,
      translateToLang: newProps.translateToLang,
    });
  }

  render() {
    return(
      <div style={styles.translateBox}>
        <h1> TranslateView Component </h1>
        <div style={styles.translateBoxFrom}>
          <h3> {this.state.translateFromLang} </h3>
          <h3> {this.state.translateOldPhrase} </h3>
        </div>
        <div style={styles.translateBoxTo}>
          <h3> {this.state.translateToLang} </h3>
          <h3> {this.state.translateNewPhrase} </h3>
        </div>
      </div>
    );
  }
}

export default TranslateView;

// translateView: false,
// translateFromLang: undefined,
// translateToLang: undefined,
// translateOldPhrase: undefined,
// translateNewPhrase: undefined,
