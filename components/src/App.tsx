import '@arco-design/web-react/dist/css/arco.css';
import { CategorySearch } from './components';
import { Space } from '@arco-design/web-react';
import { CustomSelectMock } from './mock';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { TCategoryValue } from './components/CategorySearch/types';

function App() {
  const [value, setValues] = useState<TCategoryValue>([]);

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
          width: 400
        }}
        id="json-pretty"
        data={value}
      ></JSONPretty>
      <CategorySearch
        data={CustomSelectMock}
        style={{
          width: 600
        }}
        value={[]}
        onChange={(_, v) => setValues(v)}
      />
    </Space>
  );
}

export default App;
