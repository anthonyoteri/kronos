import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Col, Icon, Row } from 'antd';
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
    };

    componentDidMount = () => {
        // TODO: Figure out how to manage the edit modal
        //this.interval = setInterval(() => this.tick(), 1000);
    };

    componentWillUnmount = () => {
        //clearInterval(this.interval);
    };

    tick = () => {
        this.setState({}); // TODO: There has to be a better way!
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
        const recordsForToday = records.filter(
            r => r.startTime > moment().startOf('day') && r.startTime < moment().endOf('day')
        );

        return (
            <Card>
                <Col style={{ paddingBottom: 8 }} span={6}>
                    <Row style={{ paddingBottom: 32 }}>
                        <Button
                            type="primary"
                            icon="form"
                            disabled={records.filter(r => r.stopTime === null).length !== 0}
                            onClick={() => {
                                this.setState({ createDialogOpen: true });
                            }}
                        >
                            Create Record
                        </Button>
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <ActivityTimeline records={recordsForToday} projects={projects} onStop={this.handleStop} />
                    </Row>
                </Col>
                <Col style={{ paddingBottom: 8 }} span={18}>
                    <Row style={{ paddingBottom: 8 }}>
                        <ActiveStats projects={projects} records={records} />
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <RecordTable
                            records={recordsForToday}
                            projects={projects}
                            onEdit={record => {
                                this.setState({ editDialogData: record, editDialogOpen: true });
                            }}
                            onDelete={this.handleDeleteRecord}
                        />
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <SystemStats projects={projects} records={records} />
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
