import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import "antd/dist/antd.css";
import { createHashHistory } from "history";

import Nav from "./containers/Nav";
import Loading from "./containers/Loading";

const Dashboard = React.lazy(() => import("./containers/Dashboard"));
const Settings = React.lazy(() => import("./containers/Settings"));
const Log = React.lazy(() => import("./containers/Log"));
const ReportWeek = React.lazy(() => import("./containers/ReportWeek"));
const ReportMonth = React.lazy(() => import("./containers/ReportMonth"));

const history = createHashHistory();

function App() {
  return (
    <Router history={history}>
      <div>
        <React.Suspense fallback={<Loading />}>
          <Nav>
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/log">
                <Log />
              </Route>
              <Route path="/report-week">
                <ReportWeek />
              </Route>
              <Route path="/report-month">
                <ReportMonth />
              </Route>
            </Switch>
          </Nav>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
