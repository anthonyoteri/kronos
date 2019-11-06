import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { store } from './store';

import 'antd/dist/antd.css';

import Nav from './containers/Nav';
import Loader from './containers/Loader';
import Loading from './containers/Loading';

const Today = React.lazy(() => import('./containers/Today'));
const Projects = React.lazy(() => import('./containers/Projects'));
const Records = React.lazy(() => import('./containers/Records'));
const ReportWeek = React.lazy(() => import('./containers/ReportWeek'));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Loader>
                    <React.Suspense fallback={<Loading />}>
                        <Nav>
                            <Switch>
                                <Route exact path="/">
                                    <Today />
                                </Route>
                                <Route path="/projects">
                                    <Projects />
                                </Route>
                                <Route path="/records">
                                    <Records />
                                </Route>
                                <Route path="/report-week">
                                    <ReportWeek />
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
