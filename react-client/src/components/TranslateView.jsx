import React from 'react';
import styles from '../css/styles';

class TranslateView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translateData: 'translation goes here',
      translateToLang: this.props.translateToLang
    };
  }

  componentWillReceiveProps(newProps) {
    document.body.style.backgroundImage = `url('HQworldMap.jpg')`;
    this.setState({
      translateOldPhrase: newProps.translateOldPhrase,
      translateNewPhrase: newProps.translateNewPhrase,
      translateFromLang: newProps.translateFromLang,
      translateToLang: newProps.translateToLang,
    });
  }

  render() {
    let condRender;
    if (this.state.translateToLang === '') {
      condRender = (
        <div>
          <p style={styles.noTranslationYet}>No translation yet. Use Speech Commands to initiate a translation.</p>
        </div>
      );
    } else {
      condRender = (
        <div style={styles.translateBox}>
          <h1> Translate </h1>
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
    return(
      <div>
        {condRender}
      </div>
    );
  }
}

export default TranslateView;
