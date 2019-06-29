import React from 'react'
import PropTypes from 'prop-types';

import './card-action.scss';

function CardAction({icon, count, onClick, className, active, id}) {
  return (
    <div className={`socia-card--action ${className} ${active ? 'active' : ''}`} onClick={(e) => onClick(e, id)}>
      <span className="action__icon">{icon}</span>
      <span className="action__count">{count}</span>
    </div>
  );
}

CardAction.propTypes = {
  icon: PropTypes.any,
  count: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

CardAction.defaultProps = {
  onClick: () => {},
  className: ''
};

export default CardAction
