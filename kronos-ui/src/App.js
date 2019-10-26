import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './store';

import 'antd/dist/antd.css';

import Nav from './containers/Nav';
import Loader from './containers/Loader';
import Loading from './containers/Loading';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));
const Settings = React.lazy(() => import('./containers/Settings'));
const Log = React.lazy(() => import('./containers/Log'));
const ReportWeek = React.lazy(() => import('./containers/ReportWeek'));
const ReportMonth = React.lazy(() => import('./containers/ReportMonth'));
const Example = React.lazy(() => import('./containers/Example'));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Loader>
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
                                <Route path="/example">
                                    <Example />
                                </Route>
                            </Switch>
                        </Nav>
                    </React.Suspense>
                </Loader>
            </Router>
        </Provider>
    );
}

export default App;
