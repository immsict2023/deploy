import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      <div className="tooltip-content">
        {children}
        <span className="tooltip-text">{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
