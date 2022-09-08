export const selectLayout = pathName => {
  //切换layout
  if (pathName.includes('/users')) return 'LoginLayout';
  if (pathName.includes('/device')) return 'DeviceLayout';
  else return 'LoginLayout';
};
