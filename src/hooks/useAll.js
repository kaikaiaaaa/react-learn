/**
 * 自定义hook
 * 当组件加载完成后 获取此接口
 */
import { useEffect, useState } from 'react';

export function useAll() {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    (async () => {
      //获取接口
      const res = await getXXX();
      setAllData(res);
    })();
  }, []);
  return allData;
}
