import 'antd/dist/reset.css';
import {
  Button,
  Input
} from 'antd'

function App() {
  return (
    <div className="App">
      <div className="app">
        <Input placeholder="请输入" />
        <Button type='primary'>按钮</Button>
      </div>
    </div>
  );
}

export default App;
