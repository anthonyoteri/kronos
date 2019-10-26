import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects } from '../store/projects/actions';
import { fetchRecords } from '../store/records/actions';

import Loading from './Loading';

class Loader extends Component {
    state = { isReady: false };

    async componentDidMount() {
        const { loadProjects, loadRecords } = this.props;
        await Promise.all([loadProjects(), loadRecords()]);
        this.setState({ isReady: true });
    }

    render() {
        const { isReady } = this.state;
        const { children } = this.props;

        if (isReady) {
            return <>{children}</>;
        } else {
            return <Loading />;
        }
    }
}

const mapDispatchToProps = dispatch => ({
    loadProjects: () => dispatch(fetchProjects()),
    loadRecords: () => dispatch(fetchRecords()),
});

export default connect(
    null,
    mapDispatchToProps
)(Loader);
