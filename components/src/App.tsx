import '@arco-design/web-react/dist/css/arco.css';
import { CategorySearch, CategoryInput } from './components';
import { Space } from '@arco-design/web-react';
import { CustomSelectMock } from './mock';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { ICategorySearchMapValue } from './components/CategorySearch/types';

function App() {
  const [value, setValues] = useState<ICategorySearchMapValue>({});

  return (
    <Space
      direction="vertical"
      style={{
        padding: 20
      }}
      align="start"
    >
      <JSONPretty
        style={{
          border: '1px solid blue',
          width: 400,
        }}
        id="json-pretty"
        data={value}
      ></JSONPretty>
      <CategorySearch
        data={CustomSelectMock}
        style={{
          width: 600
        }}
        initValue={value}
        onChange={(v) => setValues(v)}
      />
      <CategoryInput
        style={{
          width: 600
        }}
      />
    </Space>
  );
}

export default App;
