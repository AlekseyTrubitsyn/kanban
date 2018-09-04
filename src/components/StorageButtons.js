import React from 'react';
import PropTypes from 'prop-types';

const StorageButtons = ({ onSaveClick, onLoadClick, onResetClick }) => (
  <div style={{'position': 'absolute'}}>
    <button
      className="btn btn-primary"
      onClick={onSaveClick}>Save</button>
    <button
      className="btn btn-primary"
      onClick={onLoadClick}>Load</button>
    <button
      className="btn btn-primary"
      onClick={onResetClick}>Reset</button>
  </div>
);

StorageButtons.propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  onLoadClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
}

export default StorageButtons;
