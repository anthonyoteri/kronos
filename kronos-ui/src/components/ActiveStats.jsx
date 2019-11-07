import React from 'react';
import moment from 'moment';

import { Col, Row, Statistic } from 'antd';

const RecordStats = ({ projects, records }) => {
    const recordsToday = records.filter(
        r => moment(r.startTime).isAfter(moment().startOf('day')) && moment(r.startTime).isBefore(moment().endOf('day'))
    );
    const activeRecord = records.filter(r => r.stopTime === null)[0];

    const durationToday = recordsToday.reduce(
        (subt, r) =>
            (subt += r.stopTime ? moment(r.stopTime).diff(moment(r.startTime)) : moment().diff(moment(r.startTime))),
        0
    );

    return (
        <div>
            <Row style={{ paddingBottom: 8 }}>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic
                        title="Current project"
                        value={activeRecord ? projects.find(p => p.slug === activeRecord.project).name : '--'}
                    />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic
                        title="Active time"
                        value={
                            activeRecord
                                ? moment.duration(moment().diff(moment(activeRecord.startTime))).humanize()
                                : '--'
                        }
                    />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic
                        title="Total time"
                        value={durationToday ? moment.duration(durationToday).humanize() : '--'}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default RecordStats;
