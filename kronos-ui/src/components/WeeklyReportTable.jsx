import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Button, Col, Icon, Row, Table } from 'antd';

class WeeklyReportTable extends Component {
    state = {
        startDate: moment().startOf('week'),
        endDate: moment().endOf('week'),
    };

    componentDidMount() {
        const { currentDate } = this.props;
        this.setState({
            startDate: moment(currentDate).startOf('week'),
            endDate: moment(currentDate).endOf('week'),
        });
    }

    decrementWeek = () => {
        const { startDate, endDate } = this.state;
        this.setState({ startDate: startDate.add(-7, 'days'), endDate: endDate.add(-7, 'days') });
    };

    incrementWeek = () => {
        const { startDate, endDate } = this.state;
        this.setState({ startDate: startDate.add(7, 'days'), endDate: endDate.add(7, 'days') });
    };

    render() {
        const { records, projects } = this.props;
        const { startDate, endDate } = this.state;

        const dataSource = makeTable(transposeWeek(recordsPerDay(records, startDate, endDate)));
        console.log('dataSource: ', dataSource);

        const columns = [
            {
                key: 'project',
                title: 'Project',
                dataIndex: 'project',
                sorter: (a, b) =>
                    projects
                        .find(p => p.slug === a.project)
                        .name.localeCompare(projects.find(p => p.slug === b.project).name),
                render: (text, record) => projects.find(p => p.slug === record.project).name,
            },
            {
                key: 'monday',
                title: 'Monday',
                dataIndex: 'monday',
                render: (text, record) => (record.monday ? moment.duration(record.monday * 1000).humanize() : null),
            },
            {
                key: 'tuesday',
                title: 'Tuesday',
                dataIndex: 'tuesday',
                render: (text, record) => (record.tuesday ? moment.duration(record.tuesday * 1000).humanize() : null),
            },
            {
                key: 'wednesday',
                title: 'Wednesday',
                dataIndex: 'wednesday',
                render: (text, record) =>
                    record.wednesday ? moment.duration(record.wednesday * 1000).humanize() : null,
            },
            {
                key: 'thursday',
                title: 'Thursday',
                dataIndex: 'thursday',
                render: (text, record) => (record.thursday ? moment.duration(record.thursday * 1000).humanize() : null),
            },
            {
                key: 'friday',
                title: 'Friday',
                dataIndex: 'friday',
                render: (text, record) => (record.friday ? moment.duration(record.friday * 1000).humanize() : null),
            },
            {
                key: 'saturday',
                title: 'Saturday',
                dataIndex: 'saturday',
                render: (text, record) => (record.saturday ? moment.duration(record.saturday * 1000).humanize() : null),
            },
            {
                key: 'sunday',
                title: 'Sunday',
                dataIndex: 'sunday',
                render: (text, record) => (record.sunday ? moment.duration(record.sunday * 1000).humanize() : null),
            },
        ];

        return (
            <Table
                title={() => (
                    <Row type="flex" justify="space-between">
                        <Col span={4}>
                            <Button onClick={this.decrementWeek} type="link" size="sm">
                                <Icon type="left" />
                            </Button>
                            <Icon type="calendar" /> Week {endDate.isoWeek()}
                            <Button onClick={this.incrementWeek} type="link" size="sm">
                                <Icon type="right" />
                            </Button>
                        </Col>
                        <Col span={4}>
                            {startDate.format('ll')} - {endDate.format('ll')}
                        </Col>
                    </Row>
                )}
                columns={columns}
                dataSource={dataSource}
                rowKey="project"
                pagination={false}
            />
        );
    }
}

const daysInRange = (startDate, endDate) => {
    let days = [];
    for (var m = moment(startDate); m.isBefore(endDate); m.add(1, 'days')) {
        days.push(m.clone().startOf('date'));
    }

    return days;
};

const recordsPerDay = (records, startDate, endDate) => {
    const days = daysInRange(startDate, endDate);
    return days.map(d => recordsForDay(records, d));
};

const recordsForDay = (records, targetDate) => {
    const startOfDay = moment(targetDate).startOf('day');
    const endOfDay = moment(targetDate).endOf('day');

    const data = records.filter(r => moment(r.startTime).isAfter(startOfDay) && moment(r.startTime).isBefore(endOfDay));
    return aggregateDay(data);
};

const aggregateDay = records => {
    return records.reduce((agg, current) => {
        const o = { ...agg };
        if (o[current.project]) {
            o[current.project] += current.duration;
        } else {
            o[current.project] = current.duration;
        }
        return o;
    }, {});
};

const transposeWeek = data => {
    const result = {};
    for (let i = 0; i < data.length; i++) {
        let dow = moment()
            .startOf('week')
            .add(i, 'days')
            .format('dddd')
            .toLowerCase();
        for (let project of Object.keys(data[i])) {
            if (result.hasOwnProperty(project)) {
                result[project][dow] = data[i][project];
            } else {
                result[project] = { [dow]: data[i][project] };
            }
        }
    }
    return result;
};

const makeTable = data => {
    const table = [];
    for (let p of Object.keys(data)) {
        table.push({ ...data[p], project: p });
    }
    return table;
};

const mapStateToProps = state => ({
    projects: state.projects.list,
    records: state.records.list,
});

export default connect(mapStateToProps)(WeeklyReportTable);
