import 'antd/dist/reset.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <BrowserRouter>
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
