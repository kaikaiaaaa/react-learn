import React from 'react';
import { selectLayout } from 'utils/selectLayout.js';
import LoginLayout from './LoginLayout';
import DeviceLayout from './DeviceLayout';

const Layout = ({ children, history, location }) => {
  /**
   * BasicLayout 初始布局
   * LoginLayout 登录页面布局
   */
  const layoutMap = { LoginLayout,DeviceLayout };
  const Container = layoutMap[selectLayout(location.pathname)];
  return (
    <Container>
      {children}
    </Container>
  );
};

export default Layout;
