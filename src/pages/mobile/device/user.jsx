import React from 'react';
import LanguageSelect from 'components/LanguageSelect';
import { useIntl } from 'umi';
import { Button } from 'antd-mobile'

const User = () => {
  const intl = useIntl();
  return (
    <div>
      <div>
        {
          intl.formatMessage({
            id: 'page_setting',
          })
        }
      </div>
      {
        intl.formatMessage(
          {
            id: 'name',
            defaultMessage: '你好，刘欣静',
          },
          {
            name: '刘欣静',
          })
      }
      <Button>
        {
          intl.formatMessage({
            id: 'btn_save',
          })
        }
      </Button>
      <div><LanguageSelect></LanguageSelect></div>
    </div>
  );
};

export default User;
