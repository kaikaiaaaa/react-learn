import React from 'react';
import './css/list.less';

let result = [
  {
    id: 1,
    sn: 111,
    tag: [1, 2, 3],
  },
  {
    id: 2,
    sn: 222,
    tag: [11, 22, 33],
  },
];
const List = ({ history }) => {
    const handleToDetails = () => {
      history.push('/mobile/details/real');
    };
    const deviceList = result.map(device => (
      <div className='list-item' key={device.id}>
        <div>No.{device.sn}</div>
        <div className='tag-list'>
          {device.tag.map(tag => <span className='tag' key={tag}>{tag}</span>)}
        </div>
      </div>
    ));
    return (
      <div>
        <button onClick={handleToDetails}>跳转到details详情页面</button>
        <div className='list'>
          {deviceList}
        </div>
      </div>
    );
  }
;

export default List;
