import '@arco-design/web-react/dist/css/arco.css';
import { CategorySearch } from './components';
import { Space } from '@arco-design/web-react';
import { CustomSelectMock } from './mock';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { ICategorySearchMapValue } from './components/CategorySearch/types';

function App() {
  const [value, setValues] = useState<ICategorySearchMapValue>({});

  return (
    <Space
      style={{
        padding: 20
      }}
      align="start"
    >
      <CategorySearch
        data={CustomSelectMock}
        style={{
          width: 600
        }}
        initValue={value}
        onChange={(v) => setValues(v)}
      />
      <JSONPretty
        style={{
          border: '1px solid blue',
          width: 400,
          minHeight: 800
        }}
        id="json-pretty"
        data={value}
      ></JSONPretty>
    </Space>
  );
}

export default App;
