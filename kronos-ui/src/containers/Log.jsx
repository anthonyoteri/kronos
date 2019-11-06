import React from 'react';
import { connect } from 'react-redux';

import { Card, Col, Row, Timeline } from 'antd';

import moment from 'moment';

const MAX_ENTRIES = 50;

const Log = ({ records, projects }) => {
    const calendarFormat = {
        lastWeek: 'dddd MMM Do [at] h:mm A',
        sameElse: 'dddd MMM Do [at] h:mm A',
    };

    return (
        <Card>
            <Row>
                <Col style={{ paddingBottom: 8 }} span={24}>
                    <Timeline>
                        {records.list.slice(0, MAX_ENTRIES).map(r => (
                            <Timeline.Item key={r.id} color={r.stopTime !== null ? 'blue' : 'green'}>
                                <p>{projects.list.find(p => p.slug === r.project).name}</p>
                                <p>
                                    {moment(r.startTime).calendar(null, calendarFormat)} for{' '}
                                    {moment.duration(r.duration).humanize()}
                                </p>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </Col>
            </Row>
        </Card>
    );
};

const mapStateToProps = state => ({
    records: state.records,
    projects: state.projects,
});

export default connect(mapStateToProps)(Log);
