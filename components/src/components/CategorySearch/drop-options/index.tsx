import { IBaseDropComponentProps, ICateggorySearchDataItem } from '../types.ts';
import { Menu, Checkbox, Button } from '@arco-design/web-react';
import * as S from './styles.ts';

const CheckboxGroup = Checkbox.Group;

interface IDropOptionsProps extends IBaseDropComponentProps {
  options?: ICateggorySearchDataItem['options'];
  /**
   *   展示的组件类型
   *
   *   @default checkbox
   */
  mode: 'checkbox' | 'selectItem';
}

export const DropOptions = (props: IDropOptionsProps) => {
  const { options = [], onChange, mode, value } = props;

  if (mode === 'checkbox') {
    const checkValue = (value as string[]) || [];
    return (
      <S.CheckBoxWrapper>
        <CheckboxGroup
          direction="vertical"
          options={options}
          value={checkValue}
          onChange={(v) => onChange(v)}
        />
      </S.CheckBoxWrapper>
    );
  }
  return (
    <S.CustomMenu selectedKeys={[value as string]} onClickMenuItem={(key) => onChange(key)}>
      {options.map((item) => (
        <Menu.Item key={item.value} disabled={item.disabled}>
          {item.label}
        </Menu.Item>
      ))}
    </S.CustomMenu>
  );
};
