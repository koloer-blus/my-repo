import { Menu, Checkbox, Button } from '@arco-design/web-react';
import { ICategoryDataItem, TChangeFieldValue } from '../../../types';
import { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

interface IDropOptionsProps {
  options?: ICategoryDataItem['options'];
  /**
   *   展示的组件类型
   *
   *   @default checkbox
   */
  mode: 'checkbox' | 'selectItem';
  value: unknown;
  changeFieldValue: TChangeFieldValue;
}

export const SelectPannel = (props: IDropOptionsProps) => {
  const { options = [], mode, value, changeFieldValue } = props;
  const [checkState, setCheckState] = useState(value || []);

  if (mode === 'checkbox') {
    // const checkValue = (value as string[]) || [];
    return (
      <div>
        <CheckboxGroup
          value={checkState as string[]}
          onChange={(v) => setCheckState(v)}
          direction="vertical"
          options={options}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Button size="mini" onClick={() => setCheckState([])}>
            清空
          </Button>
          <Button
            size="mini"
            type="primary"
            onClick={() => {
              changeFieldValue(checkState);
            }}
          >
            确认
          </Button>
        </div>
      </div>
    );
  }
  return (
    <Menu selectedKeys={[value as string]} onClickMenuItem={(key) => changeFieldValue(key)}>
      {options.map((item) => (
        <Menu.Item key={`${item.value}`} disabled={item.disabled}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};
