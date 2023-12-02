import "@arco-design/web-react/dist/css/arco.css";
import { CategorySearch } from './components'
import { Space } from "@arco-design/web-react";
import { CustomSelectMock } from "./mock";

function App() {

  return (
    <Space style={{
      padding: 20
    }} direction="vertical">
      <CategorySearch
          data={CustomSelectMock}
        style={{
        width: 600
      }} />
    </Space>
  )
}

export default App
