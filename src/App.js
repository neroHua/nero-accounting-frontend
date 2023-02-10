import logo from './logo.svg';
import './App.css';
import 'antd/dist/reset.css';
import {
  Button,
  Input
} from 'antd'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <div className="app">
      <Input placeholder="请输入" />
      <Button type='primary'>按钮</Button>
    </div>
    </div>
  );
}

export default App;
