import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Col, Row } from 'antd';
import moment from 'moment';

import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import ActivityTimeline from '../components/ActivityTimeline';
import ActiveStats from '../components/ActiveStats';
import SystemStats from '../components/SystemStats';

import { deleteRecord, updateRecord, createRecord } from '../store/records/actions';

class Today extends Component {
    state = {
        createDialogOpen: false,
        editDialogOpen: false,
        editDialogData: null,
        now: moment(),
    };

    componentDidMount = () => {
        this.interval = setInterval(() => this.setState({ now: moment() }), 1000);
    };

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    handleStop = record => {
        const { dispatch } = this.props;
        const data = { ...record, stopTime: moment() };

        dispatch(updateRecord(data));
    };

    handleCreateRecord = record => {
        const { dispatch } = this.props;
        dispatch(createRecord(record));

        this.setState({ createDialogOpen: false });
    };

    handleEditRecord = record => {
        const { dispatch } = this.props;
        dispatch(updateRecord(record));

        this.setState({ editDialogOpen: false });
    };

    handleDeleteRecord = record => {
        const { dispatch } = this.props;
        dispatch(deleteRecord(record.id));
    };

    render() {
        const { projects, records } = this.props;
        const { now } = this.state;

        const recordsForToday = records.filter(
            r =>
                moment(r.startTime).isAfter(now.clone().startOf('day')) &&
                moment(r.startTime).isBefore(now.clone().endOf('day'))
        );

        return (
            <Card>
                <Col style={{ paddingBottom: 8 }} span={6}>
                    <Row style={{ paddingBottom: 32 }}>
                        <Button
                            type="primary"
                            icon="form"
                            disabled={
                                records.filter(r => r.stopTime === null).length !== 0 ||
                                projects.filter(p => !p.locked).length === 0
                            }
                            onClick={() => {
                                this.setState({ createDialogOpen: true });
                            }}
                        >
                            Create Record
                        </Button>
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <ActivityTimeline
                            records={recordsForToday}
                            projects={projects}
                            onStop={this.handleStop}
                            now={now}
                        />
                    </Row>
                </Col>
                <Col style={{ paddingBottom: 8 }} span={18}>
                    <Row style={{ paddingBottom: 8 }}>
                        <ActiveStats projects={projects} records={records} now={now} />
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <RecordTable
                            records={recordsForToday}
                            projects={projects}
                            onEdit={record => {
                                this.setState({ editDialogData: record, editDialogOpen: true });
                            }}
                            onDelete={this.handleDeleteRecord}
                            now={now}
                        />
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <SystemStats projects={projects} records={records} now={now} />
                    </Row>
                </Col>
                <RecordForm
                    title="Create Record"
                    visible={this.state.createDialogOpen}
                    projects={projects}
                    onOk={this.handleCreateRecord}
                    onCancel={() => this.setState({ createDialogOpen: false })}
                />
                <RecordForm
                    title="Edit Record"
                    visible={this.state.editDialogOpen}
                    projects={projects}
                    data={this.state.editDialogData}
                    onOk={this.handleEditRecord}
                    onCancel={() => this.setState({ editDialogOpen: false })}
                />
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects.list,
    records: state.records.list,
});

export default connect(mapStateToProps)(Today);
