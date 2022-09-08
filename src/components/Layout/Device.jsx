import React from 'react';
import deviceStyle from './device.less';

const Device = (props) => {
  return (
    <div>
      <main className={deviceStyle.main}>
        {props.main}
      </main>
      <nav className={deviceStyle.nav}>
        {props.nav}
      </nav>
    </div>
  );
};

export default Device;
