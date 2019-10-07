import React from 'react';
import './grid.scss';

export default function Grid({className = '', columns, rows = 1, children}) {
  const gridStyels = {
    'gridTemplateColumns': `repeat(${columns}, 1fr)`,
    'gridTemplateRows': `repeat(${rows}, 1fr)`
  };
  return <div className={`grid ${className}`} style={gridStyels}>{children}</div>
}
