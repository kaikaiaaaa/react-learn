import React from 'react';
import './index.less';
import { NavLink, useIntl } from 'umi';

const DeviceBar = (props) => {
  const intl = useIntl();
  let activeStyle = {
    fontWeight: 'bold',
    color: '#000',
  };
  return (
    <div className='bar'>
      <NavLink to='/mobile/device/list' exact activeStyle={activeStyle}>
        {
          intl.formatMessage({
            id: 'bar_device',
          })
        }
      </NavLink>
      <NavLink to='/mobile/device/message' exact activeStyle={activeStyle}>
        {
          intl.formatMessage({
            id: 'bar_message',
          })
        }
      </NavLink>
      <NavLink to='/mobile/device/user' exact activeStyle={activeStyle}>
        {
          intl.formatMessage({
            id: 'bar_user',
          })
        }
      </NavLink>
    </div>
  );
};

export default DeviceBar;
