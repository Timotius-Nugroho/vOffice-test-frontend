import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./helpers/PrivateRoute";
import PublicRoute from "./helpers/PublicRoute";

import Login from "./pages/auth/Login/Login";
import Dashboard from "./pages/main/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
