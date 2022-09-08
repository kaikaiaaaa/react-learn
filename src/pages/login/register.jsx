import { React } from 'react';
import './css/register.less';
import RegisterForm from 'components/LoginForm';

const Index = () => {
  return (
    <div className='login'>
      {<LoginForm></LoginForm>}
    </div>
  );
};

export default Index;
