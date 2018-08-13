import React from 'react';

const AvailableApps = ({name, addApp, removeApp}) => (
  <div className={`available available__${name}`}>
    <p className={name}>
      {name[0].toUpperCase() + name.slice(1)} 
      <span className="available__plus" onClick={() => addApp(name)}>+</span> 
      <span className="available__minus" onClick={() => removeApp(name)}>-</span>
    </p>
  </div>
);

export default AvailableApps;