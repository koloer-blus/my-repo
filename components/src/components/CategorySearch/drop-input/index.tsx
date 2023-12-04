import { IBaseDropComponentProps } from '../types.ts';
import { Input } from '@arco-design/web-react';

interface IDropInputProps extends IBaseDropComponentProps {}

export const DropInput = (props: IDropInputProps) => {
  const { value, onChange } = props;

  return (
    <Input
      value={value as string}
      onPressEnter={(e) => onChange(e.target.value)}
    />
  );
};
