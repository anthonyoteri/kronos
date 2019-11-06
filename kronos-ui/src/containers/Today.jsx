import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Col, Icon, Progress, Row, Statistic, Timeline } from 'antd';
import moment from 'moment';

import RecordTable from '../components/RecordTable';
import RecordForm from '../components/RecordForm';
import { deleteRecord, updateRecord, createRecord } from '../store/records/actions';
import { nominalTypeHack } from 'prop-types';

const WORKING_TIME = 8 * 60 * 60 * 1000; // 8 Hours

class Today extends Component {
    state = {
        createDialogOpen: false,
        editDialogOpen: false,
        editDialogData: null,
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
        const calendarFormat = {
            lastWeek: 'dddd MMM Do [at] h:mm A',
            sameElse: 'dddd MMM Do [at] h:mm A',
        };

        const recordsForToday = records.filter(
            r => r.startTime > moment().startOf('day') && r.startTime < moment().endOf('day')
        );
        let ongoingRecord = recordsForToday.filter(r => r.stopTime === null)[0];
        if (ongoingRecord) {
            ongoingRecord = { ...ongoingRecord, project: projects.find(p => p.slug === ongoingRecord.project) };
        }
        const totalDuration = recordsForToday.reduce((subt, r) => (subt += r.duration), 0);

        return (
            <Card>
                <Col style={{ paddingBottom: 12 }} span={8}>
                    <div style={{ paddingBottom: 20 }}>
                        {ongoingRecord ? (
                            <Button
                                type="primary"
                                onClick={() =>
                                    this.handleStop({ ...ongoingRecord, project: ongoingRecord.project.slug })
                                }
                            >
                                <Icon type="pause" />
                                Stop Now
                            </Button>
                        ) : (
                            <Button
                                type="primary"
                                onClick={() => {
                                    this.setState({ createDialogOpen: true });
                                }}
                            >
                                <Icon type="form" />
                                Create Record
                            </Button>
                        )}
                    </div>
                    <Timeline>
                        {recordsForToday.map(r => (
                            <Timeline.Item key={r.id} color={r.stopTime !== null ? 'blue' : 'green'}>
                                <p>
                                    {projects.find(p => p.slug === r.project).name}{' '}
                                    {r.stopTime === null ? (
                                        <Button type="link" onClick={() => this.handleStop(r)}>
                                            <Icon type="pause" size="small" /> Stop
                                        </Button>
                                    ) : null}
                                </p>
                                <p>
                                    {moment(r.startTime).calendar(null, calendarFormat)} for{' '}
                                    {moment.duration(r.duration).humanize()}
                                </p>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Col>
                <Col style={{ paddingBottom: 8 }} span={12}>
                    <Row style={{ paddingBottom: 8 }}>
                        <Col span={8}>
                            <Statistic
                                title="Last project"
                                value={
                                    projects
                                        .filter(p => p.lastUsed !== null)
                                        .sort((a, b) => (a.lastUsed > b.lastUsed ? -1 : 1))[0].name
                                }
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="Active projects"
                                value={projects.filter(p => !p.locked).length}
                                suffix={`/${projects.length}`}
                            />
                        </Col>
                        <Col span={8}>
                            <Statistic title="Total records" value={records.length} />
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: 8 }}>
                        <Col span={8}>
                            <Statistic title="Today" value={moment.duration(totalDuration).humanize()} />
                        </Col>
                        <Col span={8}>
                            <Statistic
                                title="ETA"
                                value={moment.duration(WORKING_TIME - totalDuration).humanize(true)}
                            />
                        </Col>
                        <Col span={8}>
                            <Progress type="dashboard" percent={((totalDuration / WORKING_TIME) * 100).toFixed(0)} />
                        </Col>
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
