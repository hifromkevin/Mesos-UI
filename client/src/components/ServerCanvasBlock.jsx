import React from 'react';

const ServerCanvasBlock = ({app, checkName}) => (
  <div className={`block block__${app[0]}`}>
    {checkName(app[0])}
  </div>
);


export default ServerCanvasBlock;
