import React, { useState } from 'react';
import { Select } from 'antd';
import { getLocale,setLocale } from 'umi';

const LanguageSelect = () => {
  const { Option } = Select;
  const local = getLocale()

  function handleChange(value) {
    console.log(`selected ${value}`);
    setLocale(value, true);
  }

  return (
    <>
      <Select style={{ width: 120 }} defaultValue={local} onChange={handleChange} >
        <Option value='zh-CN'>zh-CN</Option>
        <Option value='en-US'>en-US</Option>
      </Select>
    </>
  );
};

export default LanguageSelect;
