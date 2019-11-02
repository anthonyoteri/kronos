import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'antd';

import moment from 'moment';
import RecordTable from '../components/RecordTable';
import WeeklyReportHeader from '../components/WeeklyReportHeader';
import WeeklyReportTable from '../components/WeeklyReportTable';

import { updateRecord, deleteRecord } from '../store/records/actions';
import RecordForm from '../components/RecordForm';

class ReportWeek extends Component {
    state = {
        startDate: moment().startOf('week'),
        endDate: moment().endOf('week'),
        editDialogOpen: false,
        editDialogData: null,
    };

    componentDidMount() {
        const { currentDate } = moment('2019-10-31');
        this.setState({
            startDate: moment(currentDate).startOf('week'),
            endDate: moment(currentDate).endOf('week'),
        });
    }

    handlePreviousWeek = () => {
        const { startDate, endDate } = this.state;
        this.setState({ startDate: startDate.add(-7, 'days'), endDate: endDate.add(-7, 'days') });
    };

    handleNextWeek = () => {
        const { startDate, endDate } = this.state;
        this.setState({ startDate: startDate.add(7, 'days'), endDate: endDate.add(7, 'days') });
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
        const { startDate, endDate } = this.state;

        const days = daysInRange(startDate, endDate);
        const filteredRecords = days.map(d => filterStartTime(records, d));
        const joinedRecords = filteredRecords.map(r => joinProject(projects, r));
        const aggregatedRecords = joinedRecords.map(r => aggregateDurations(r));

        return (
            <React.Fragment>
                <Card style={{ margin: 4 }}>
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
                    <Row style={{ paddingBottom: 8 }}>
                        <Col style={{ paddingBottom: 8 }} span={24}>
                            <WeeklyReportTable days={days} data={aggregatedRecords} />
                        </Col>
                    </Row>
                </Card>
                <Card style={{ margin: 4 }}>
                    <Row>
                        <Col style={{ paddingBottom: 8 }} span={24}>
                            <RecordTable
                                records={filteredRecords.flat()}
                                projects={projects}
                                onEdit={record => {
                                    this.setState({ editDialogData: record, editDialogOpen: true });
                                }}
                                onDelete={this.handleDeleteRecord}
                            />
                        </Col>
                    </Row>
                </Card>
                <RecordForm
                    title="Edit Record"
                    visible={this.state.editDialogOpen}
                    projects={projects}
                    data={this.state.editDialogData}
                    onOk={this.handleEditRecord}
                    onCancel={() => this.setState({ editDialogOpen: false })}
                />
            </React.Fragment>
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
    const startOfDay = moment(targetDate).startOf('day');
    const endOfDay = moment(targetDate).endOf('day');

    const data = records.filter(r => moment(r.startTime).isAfter(startOfDay) && moment(r.startTime).isBefore(endOfDay));
    return data;
};

const joinProject = (projects, records) => {
    return records.map(r => ({ ...r, project: projects.find(p => p.slug === r.project) }));
};

const aggregateDurations = records => {
    return records.reduce((agg, current) => {
        const o = { ...agg };
        if (o[current.project.name]) {
            o[current.project.name] += current.duration;
        } else {
            o[current.project.name] = current.duration;
        }
        return o;
    }, {});
};
