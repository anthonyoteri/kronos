import React from 'react';
import moment from 'moment';

import { Col, Row, Statistic } from 'antd';

const SystemStats = ({ projects, records, now }) => {
    const activeProjects = projects.filter(p => !p.locked);

    const recordsMonth = records.filter(
        r =>
            moment(r.startTime).isAfter(now.clone().startOf('month')) &&
            moment(r.startTime).isBefore(now.clone().endOf('month'))
    );
    const recordsWeek = recordsMonth.filter(
        r =>
            moment(r.startTime).isAfter(now.clone().startOf('week')) &&
            moment(r.startTime).isBefore(now.clone().endOf('week'))
    );
    const recordsToday = recordsWeek.filter(
        r =>
            moment(r.startTime).isAfter(now.clone().startOf('day')) &&
            moment(r.startTime).isBefore(now.clone().endOf('day'))
    );

    return (
        <div>
            <Row style={{ paddingBottom: 8 }}>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic title="Active projects" value={activeProjects.length} suffix={`/${projects.length}`} />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic
                        title="Last Project"
                        value={
                            projects.filter(p => p.lastUsed).length > 0
                                ? projects
                                      .filter(p => p.lastUsed !== null)
                                      .sort((a, b) => (moment(a.lastUsed).isBefore(moment(b.lastUsed)) ? 1 : -1))[0]
                                      .name
                                : 'N/A'
                        }
                    />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic title="Records this month" value={recordsMonth.length} />
                </Col>
            </Row>
            <Row style={{ paddingBottom: 8 }}>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic title="Records this week" value={recordsWeek.length} />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic title="Records today" value={recordsToday.length} />
                </Col>
                <Col style={{ paddingBottom: 8 }} span={8}>
                    <Statistic title="Records all time" value={records.length} />
                </Col>
            </Row>
        </div>
    );
};

export default SystemStats;
