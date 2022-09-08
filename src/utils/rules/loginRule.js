//登录验证
export const loginRule = {
  userName: [
    {
      required: true,
      message: '请输入用户名！',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码！',
    },
    { min: 6, message: '最少6位' },
  ],
  mail:[
    {
      type: 'email',
      message: '请输入正确的邮箱!',
    },
    {
      required: true,
      message: '请输入邮箱！',
    },
  ],
  phone: [
    {
      validator: () => {
        const phoneReg = '...';
        switch (true) {
          case !Boolean(val):
            return Promise.reject('手机号不能为空');
          case !phoneReg:
            return Promise.reject('验证没通过');
          default:
            return Promise.resolve();
        }
      },
    },
  ],
};
