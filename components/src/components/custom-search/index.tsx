import { Form, Input, InputTag, Select, Space } from '@arco-design/web-react';
import { ICategorySearchTagItem } from './types';
import { useUserClickOptions } from './hooks';
import { useState } from 'react';

interface IProps {
  data: ICategorySearchTagItem[];
}

const defaultOptionsKey = 'CustomSearchMappingKey';

export const CustomSearch = (props: IProps) => {
  const { data } = props;
  const [form] = Form.useForm();
  const [waitingKey, setWatingKey] = useState<string>();
  const [values, setValues] = useState<any[]>([]);
  const [showLabelOptions, setShowLabelOptions] = useState(false);
  const currentData = data.find((item) => item.field === waitingKey)!;
  const options = useUserClickOptions(data);

  return (
    <Form form={form}>
      <Space direction="vertical">
        <Form.Item shouldUpdate>
          {(values) => {
            return (
              <p>
                <code>
                  {JSON.stringify({
                    wating: waitingKey,
                    values
                  })}
                </code>
              </p>
            );
          }}
        </Form.Item>
        <InputTag
          onClick={(e) => {
            setShowLabelOptions(true);
          }}
          //   onBlur={() => {
          //     setShowLabelOptions(false);
          //   }}
          //   dragToSort
          style={{ width: 800 }}
          value={values.map((item) => `${item.label}: ${item.valueLabel}`)}
          allowClear
        />
        <Space>
          <Form.Item field={defaultOptionsKey}>
            <Select
              popupVisible={showLabelOptions}
              style={{ width: 310, height: 0 }}
              onChange={(value) => {
                setWatingKey(value);
                setShowLabelOptions(false);
              }}
            >
              {options.map((item) => {
                return (
                  <Select.Option className={'arco-select-option'} value={item.value}>
                    {item.label}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            {!currentData?.type?.includes('Input') ? (
              <Select
                style={{ width: 300 }}
                options={currentData?.options}
                onChange={(_, option) => {
                  console.log(option);
                  setValues([
                    ...values,
                    {
                      key: currentData.field,
                      label: currentData.label,
                      value: option?.value,
                      valueLabel: option?.children
                    }
                  ]);
                }}
              />
            ) : (
              <Input
                onBlur={(e) => {
                  setValues([
                    ...values,
                    {
                      key: currentData.field,
                      label: currentData.label,
                      value: e.target.value,
                      valueLabel: e.target.value
                    }
                  ]);
                }}
              />
            )}
          </Form.Item>
        </Space>
      </Space>
    </Form>
  );
};
