import React from 'react';
import Device from '../components/Layout/Device';
import DeviceBar from '../components/DeviceBar';
import deviceStyle from './css/deviceLayout.less';


const DeviceLayout = ({ children }) => {
  return (
    <Device
      main={<div className={deviceStyle.main}>{children}</div>}
      nav={<DeviceBar></DeviceBar>}>
    </Device>
  );
};

export default DeviceLayout;
