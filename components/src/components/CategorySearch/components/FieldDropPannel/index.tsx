import { Menu } from '@arco-design/web-react';
import { ICategorySearchProps } from '../../types';
import { useMemo } from 'react';

export const FieldDropPannel = ({
  data,
  searchValue = '',
  updateCacheField
}: {
  data: ICategorySearchProps['data'];
  searchValue?: string;
  updateCacheField: (v: string) => void;
}) => {
  const filteredData = useMemo(() => {
    const tempData =
      data?.filter((item) => {
        return item.field.includes(searchValue) || item.label?.toString().includes(searchValue);
      }) || [];
    return tempData?.length ? tempData : data;
  }, [data, searchValue]);
  return (
    <Menu
      onClickMenuItem={(key) => {
        updateCacheField(key);
      }}
    >
      {filteredData?.map((item) => (
        <Menu.Item key={item.field}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );
};
