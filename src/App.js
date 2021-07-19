import { BrowserRouter as Router, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import AdminDashboard from "./pages/main/AdminDashboard/AdminDashboard";
import Form from "./pages/main/Form/From";
import Page404 from "./pages/error/404";
import Page403 from "./pages/error/403";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <PublicRoute restricted={true} path="/" exact component={Login} />
          <PublicRoute restricted={false} path="/form" exact component={Form} />
          <PublicRoute
            restricted={false}
            path="/404"
            exact
            component={Page404}
          />
          <PublicRoute
            restricted={false}
            path="/403"
            exact
            component={Page403}
          />
          <PrivateRoute path="/admin" exact component={AdminDashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
