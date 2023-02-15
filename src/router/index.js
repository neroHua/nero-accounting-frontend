import LoginForm from "../pages/login/index.tsx"

const routes = [
  {
    path: "/",
    redirect: '/login',
  },
  {
    path: "/login",
    element: <LoginForm/>
  }
]

export default routes;
