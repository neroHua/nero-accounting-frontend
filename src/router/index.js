import LoginForm from "../pages/login/index.tsx"
import TagPage from "../pages/tag/index.tsx"
import AccountingPage from "../pages/accounting/index.tsx"

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
  },
  {
    path: "/accounting",
    element: AccountingPage,
  }
]

export default routes;
