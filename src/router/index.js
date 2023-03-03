import LoginForm from "../pages/login/index.tsx"
import TagPage from "../pages/tag/index.tsx"
import AccountingPage from "../pages/accounting/index.tsx"
import StatisticsAndAnalysisPage from "../pages/statisticsAndAnalysis/index.tsx"

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
  },
  {
    path: "/statisticsAndAnalysis",
    element: StatisticsAndAnalysisPage,
  },
]

export default routes;
