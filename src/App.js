import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <BrowserRouter>
      <NavLink to="/login">登录</NavLink>
      <NavLink to="/tag">标签</NavLink>
      <NavLink to="/accounting">账单</NavLink>
      <NavLink to="/statisticsAndAnalysis">统计与分析</NavLink>
      <Routes>
        {routes.map((item, index) => {
            return (
              <Route
                key={index}
                exact
                path={item.path}
                element={<item.element/>}
              />
            );
          })}
      </Routes>
  </BrowserRouter>
  );
}

export default App;
