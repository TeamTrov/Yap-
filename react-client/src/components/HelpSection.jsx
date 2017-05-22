import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const HelpSection = (props) => {
  const actions = [
    <FlatButton
      label="Close"
      onTouchTap={props.clickHelp}
    />,
  ];
  const toggle = props.helpToggle;
  return (
    <div>
      <Dialog
        title="Possible Commands"
        actions={actions}
        open={toggle}
        onRequestClose={props.clickHelp}
        styles={styles.Dialog}
      >
        <div>
          <p>Say &quot;Show me SOMETHING&quot;: To start your search</p>
          <p>Say &quot;Update language to SOMETHING&quot;: To change your destination language</p>
          <p>Say &quot;Translate SOMETHING&quot;: To translate from English to your chosen language</p>
          <p>Say &quot;Travel to SOMETHING&quot;: To change your current location</p>
          <p>Say &quot;Post to Facebook&quot;: To post to Facebook</p>
          <p>Say &quot;Save to Favorites&quot;: To save</p>
          <p>Say &quot;Remove from Favorites&quot;: To remove current selection</p>
          <p>Say &quot;Go to Favorites&quot;: to see your favorite places</p>
          <p>Say &quot;Go to Front Page&quot;: to go to the main page</p>
          <p>Say &quot;HELP ME&quot;: to get some help</p>
        </div>
      </Dialog>
    </div>
  );
};

HelpSection.propTypes = {
  clickHelp: PropTypes.func,
  helpToggle: PropTypes.bool,
};

HelpSection.defaultProps = {
  clickHelp: PropTypes.func,
  helpToggle: false,
};

export default HelpSection;
