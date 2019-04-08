import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Tooltip from '../components/tooltip';

const Tooltips = (props) => {
  const { tooltips } = props;

  return (
    <div className="tooltips">
      {tooltips && tooltips.map((tooltip, index) => (
        <Tooltip 
          key={index}
          {...tooltip}
        />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tooltips: state.tooltips.tooltips
  }
}

const propTypes = {
  tooltips: PropTypes.arrayOf(
    PropTypes.shape({
      element: PropTypes.instanceOf(Element).isRequired,
      message: PropTypes.string.isRequired
    })
  )
};

Tooltips.propTypes = propTypes;
export default connect(mapStateToProps)(Tooltips);