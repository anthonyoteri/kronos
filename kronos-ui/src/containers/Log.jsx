import React from 'react';
import { connect } from 'react-redux';

import { Card, Col, Row, Timeline } from 'antd';

import moment from 'moment';

const Log = ({ records, projects }) => {
    return (
        <Card>
            <Row>
                <Col style={{ paddingBottom: 8 }} span={24}>
                    <Timeline>
                        {records.list.slice(0, 10).map(r => (
                            <Timeline.Item key={r.id} color={r.stopTime !== null ? 'blue' : 'green'}>
                                <p>{projects.list.find(p => p.slug === r.project).name}</p>
                                <p>
                                    {moment(r.startTime).calendar()} for {moment.duration(r.duration * 1000).humanize()}
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
