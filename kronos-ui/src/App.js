import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './store';

import 'antd/dist/antd.css';

import Nav from './containers/Nav';
import Loader from './containers/Loader';
import Loading from './containers/Loading';

const Projects = React.lazy(() => import('./containers/Projects'));
const Records = React.lazy(() => import('./containers/Records'));
const Log = React.lazy(() => import('./containers/Log'));
const ReportWeek = React.lazy(() => import('./containers/ReportWeek'));
const ReportMonth = React.lazy(() => import('./containers/ReportMonth'));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Loader>
                    <React.Suspense fallback={<Loading />}>
                        <Nav>
                            <Switch>
                                <Route exact path="/"></Route>
                                <Route path="/projects">
                                    <Projects />
                                </Route>
                                <Route path="/records">
                                    <Records />
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
                </Loader>
            </Router>
        </Provider>
    );
}

export default App;
