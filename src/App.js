import 'antd/dist/reset.css';
import {
  Button,
  Input
} from 'antd'

import { loginService } from './service/login/login';

const user = {userId: "admin", password: "admin"}

function App() {
  return (
    <div className="App">
      <div className="app">
        <Input placeholder="请输入"  defaultValue={process.env.BASE_URL}  />
        <Button type='primary' onClick={ () => {console.log(process.env);loginService(user)} }>按钮</Button>
      </div>
    </div>
  );
}

export default App;
