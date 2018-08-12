import React from 'react';

const AvailableApps = ({name, addApp, destroy}) => (
  <div className={`available available__${name}`}>
    <p className={name}>
      {name[0].toUpperCase() + name.slice(1)} 
      <span onClick={() => addApp(name)}>+</span> 
      <span onClick={() => destroy(name)}>-</span>
    </p>
  </div>

  
);

export default AvailableApps;