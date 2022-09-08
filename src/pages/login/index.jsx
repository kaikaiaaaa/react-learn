import { React } from 'react';
import './css/login.less';
import LoginForm from 'components/LoginForm';

const Index = () => {
  return (
    <div className='login'>
      {<LoginForm></LoginForm>}
    </div>
  );
};

export default Index;
