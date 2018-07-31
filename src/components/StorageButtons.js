import React from 'react';

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

export default StorageButtons;
