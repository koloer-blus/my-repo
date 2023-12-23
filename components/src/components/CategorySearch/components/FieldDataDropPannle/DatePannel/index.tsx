import { DatePicker } from '@arco-design/web-react';
import { TChangeFieldValue } from '../../../types';

export const DatePannel = ({
  type,
  value,
  changeFieldValue
}: {
  type: 'Date' | 'DateRanger';
  changeFieldValue: TChangeFieldValue;
  value: unknown;
}) => {
  if (type === 'Date') {
    return (
      <DatePicker
        value={value as string}
        onChange={(v) => changeFieldValue(v)}
        triggerElement={null}
        style={{ width: 268 }}
      />
    );
  }
  return (
    <DatePicker.RangePicker
      value={value as string[]}
      onChange={(v) => changeFieldValue(v)}
      triggerElement={null}
      style={{ width: 560, marginTop: 20 }}
    />
  );
};
