/*
pages
*/
//root
import Root from "../pages/Root/index";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import RecoverPassword from "../pages/Authentication/RecoverPassword";
import ChangePassword from "../pages/Authentication/ChangePassword";
import LockScreen from "../pages/Authentication/LockScreen";
import Topics from "../pages/Topic";
import Agents from "../pages/Agents";
import Chat from "../pages/ChatAdmin";

// dashboard
import Dashboard from "../pages/Dashboard/index";
import DashboardUser from "../pages/DashboardUser/index";
import StarterPage from "../pages/StarterPage/index";

interface RouteProps {
  path: string;
  component: any;
  exact?: boolean;
}

const publicRoutes: Array<RouteProps> = [
  { path: "/auth-login", component: Login },
  { path: "/auth-register", component: Register },
  { path: "/auth-recoverpw", component: RecoverPassword },
  { path: "/auth-changepassword", component: ChangePassword },
  { path: "/auth-lock-screen", component: LockScreen },
  { path: "/logout", component: Logout },
];

const privateRoutes: Array<RouteProps> = [
  { path: "/Topic", component: Topics },
  { path: "/Agents", component: Agents },
  { path: "/pages-starter", component: StarterPage },
  { path: "/dashboard", component: Dashboard },
  { path: "/Chat", component: Chat },
  { path: "/", exact: true, component: Root },
];

const UserRoutes: Array<RouteProps> = [
  { path: "/pages-starter", component: StarterPage },
  { path: "/dashboard", component: DashboardUser },
  { path: "/", exact: true, component: DashboardUser },
];

export { publicRoutes, privateRoutes, UserRoutes };
