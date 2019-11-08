import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'antd';

import moment from 'moment';
import RecordTable from '../components/RecordTable';
import WeeklyReportHeader from '../components/WeeklyReportHeader';
import WeeklyReportTable from '../components/WeeklyReportTable';

import { updateRecord, deleteRecord } from '../store/records/actions';
import ActivityTimeline from '../components/ActivityTimeline';
import RecordForm from '../components/RecordForm';

class ReportWeek extends Component {
    state = {
        editDialogOpen: false,
        editDialogData: null,
        startDate: moment().startOf('week'),
        now: moment(),
    };

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ now: moment() }), 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    };

    handlePreviousWeek = () => {
        const { startDate } = this.state;
        this.setState({ startDate: startDate.add(-7, 'days') });
    };

    handleNextWeek = () => {
        const { startDate } = this.state;
        this.setState({ startDate: startDate.add(7, 'days') });
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
        const { startDate, now } = this.state;
        const endDate = startDate.clone().add(1, 'week');

        const days = daysInRange(startDate, endDate);
        const filteredRecords = days.map(d => filterStartTime(records, d));
        const joinedRecords = filteredRecords.map(r => joinProject(projects, r));
        const aggregatedRecords = joinedRecords.map(r => aggregateDurations(r, now));
        const flatSortedRecords = filteredRecords
            .flat()
            .sort((a, b) => (moment(a.startTime).isBefore(moment(b.startTime)) ? 1 : -1));

        return (
            <Card>
                <Row>
                    <Col style={{ paddingBottom: 8 }} span={24}>
                        <WeeklyReportHeader
                            onPreviousWeek={this.handlePreviousWeek}
                            onNextWeek={this.handleNextWeek}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Col>
                </Row>
                <Row style={{ paddingBottom: 64 }}>
                    <Col style={{ paddingBottom: 8 }} span={24}>
                        <WeeklyReportTable days={days} data={aggregatedRecords} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ paddingBottom: 8 }} span={6}>
                        <ActivityTimeline projects={projects} records={flatSortedRecords} now={now} />
                    </Col>
                    <Col style={{ paddingBottom: 8 }} span={18}>
                        <RecordTable
                            records={flatSortedRecords}
                            projects={projects}
                            onEdit={record => {
                                this.setState({ editDialogData: record, editDialogOpen: true });
                            }}
                            onDelete={this.handleDeleteRecord}
                            now={now}
                        />
                    </Col>
                </Row>
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

export default connect(mapStateToProps)(ReportWeek);

const daysInRange = (startDate, endDate) => {
    let days = [];
    for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
        days.push(m.clone().startOf('date'));
    }

    return days;
};

const filterStartTime = (records, targetDate) => {
    const startOfDay = moment(targetDate)
        .clone()
        .startOf('day');
    const endOfDay = moment(targetDate)
        .clone()
        .endOf('day');

    const data = records.filter(r => moment(r.startTime).isAfter(startOfDay) && moment(r.startTime).isBefore(endOfDay));
    return data;
};

const joinProject = (projects, records) => {
    return records.map(r => ({ ...r, project: projects.find(p => p.slug === r.project) }));
};

const aggregateDurations = (records, now) => {
    return records.reduce((agg, current) => {
        const o = { ...agg };
        const duration = moment(current.stopTime ? current.stopTime : now).diff(moment(current.startTime));

        if (o[current.project.name]) {
            o[current.project.name] += duration;
        } else {
            o[current.project.name] = duration;
        }
        return o;
    }, {});
};
