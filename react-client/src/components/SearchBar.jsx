import React from 'react';
import SearchInput from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
// import FlatButton from 'material-ui/FlatButton';
// import Speaker from 'material-ui/svg-icons/hardware/keyboard-voice';
import styles from '../css/styles';

const blank = [];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
    this.onUpdateInput = this.onUpdateInput.bind(this);
  }

  onUpdateInput(input) {
    this.setState({
      input,
    });
  }

  render() {
    return (
      <div>
        <SearchInput
          style={styles.searchInput}
          hintText="Search for food and more"
          dataSource={blank}
          searchText={this.state.input}
          onUpdateInput={this.onUpdateInput}
        />
        <RaisedButton
          ref="raisedButton"
          style={styles.searchButton}
          label="Search" backgroundColor={styles.mainColor}
          labelColor="rgb(255, 255, 255)"
          onTouchTap={() => this.props.onSearch(this.state.input)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  startSpeech: PropTypes.func,
};

SearchBar.defaultProps = {
  onSearch: PropTypes.func,
  startSpeech: PropTypes.func,
};

export default SearchBar;
