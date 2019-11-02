import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Icon, Table, Row } from 'antd';

import moment from 'moment';

class ReportWeek extends Component {
    state = {};

    render() {
        const { projects } = this.props;

        const dataSource = [
            {
                project: 'education',
                wednesday: 300,
                thursday: 900,
            },
            {
                project: 'orc',
                monday: 1800,
                tuesday: 1750,
                wednesday: 10000,
            },
            {
                project: 'feat-1709',
                friday: 1850,
            },
        ];

        const columns = [
            {
                key: 'project',
                title: 'Project',
                dataIndex: 'project',
                sorter: (a, b) =>
                    projects.list
                        .find(p => p.slug === a.project)
                        .name.localeCompare(projects.list.find(p => p.slug === b.project).name),
                render: (text, record) => projects.list.find(p => p.slug === record.project).name,
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
            <Card>
                <Row>
                    <Col style={{ paddingBottom: 8 }} span={24}>
                        <Table
                            title={() => (
                                <Row type="flex" justify="space-between">
                                    <Col span={4}>
                                        <Icon type="calendar" /> Week {moment().isoWeek()}
                                    </Col>
                                    <Col span={4}>
                                        {moment()
                                            .isoWeekday(1)
                                            .format('ll')}{' '}
                                        -{' '}
                                        {moment()
                                            .isoWeekday(7)
                                            .format('ll')}
                                    </Col>
                                </Row>
                            )}
                            columns={columns}
                            dataSource={dataSource}
                        />
                    </Col>
                </Row>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
});

export default connect(mapStateToProps)(ReportWeek);
