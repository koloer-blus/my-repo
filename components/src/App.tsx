import "@arco-design/web-react/dist/css/arco.css";
import { CustomSearch } from './components'
import { Space } from "@arco-design/web-react";
import { CustomSelectMock } from "./mock";

function App() {

  return (
    <Space style={{
      padding: 20
    }} direction="vertical">
      <CustomSearch data={CustomSelectMock} />
    </Space>
  )
}

export default App
