import LoginForm from "../pages/login/index.tsx"
import TagPage from "../pages/tag/index.tsx"

const routes = [
  {
    path: "/",
    redirect: '/login',
    element: LoginForm,
  },
  {
    path: "/login",
    element: LoginForm,
  },
  {
    path: "/tag",
    element: TagPage,
  }
]

export default routes;
