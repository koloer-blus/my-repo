import { Space, Tag } from '@arco-design/web-react';
import { ICategoryDataItem, TCategoryItemValue, TCategoryValue } from '../../types';

export const renderTags = (props: {
  value: TCategoryItemValue;
  values: TCategoryValue;
  data?: ICategoryDataItem;
  clickTag: () => void;
  removeTag: (field: string) => void;
}) => {
  const { value, values, data, removeTag, clickTag } = props;

  let valueEl: any = value.value;
  if (data?.fieldComponentType === 'Custom') {
    return data?.renderCustomValueTag?.(value, values, data);
  }
  if (data?.options) {
    valueEl = (
      <Space split={'|'} size={0}>
        {data.options
          .filter((item) => (value.value as string[])?.includes(item.value as string))
          .map((item) => item.label)}
      </Space>
    );
  }

  if (['DateRangerPicker'].includes(data?.fieldComponentType || '')) {
    valueEl = (value.value as string[]).join('~');
  }

  if (data?.fieldComponentType === 'InputTag') {
    valueEl = value.value;
  }

  return (
    <Tag
      closable
      style={{
        maxWidth: 350
      }}
      onClick={clickTag}
      onClose={(e) => {
        removeTag(data?.field!);
        e?.stopPropagation?.();
      }}
    >
      {data?.label}:{valueEl}
    </Tag>
  );
};
