import React from 'react';

import { Button, Col, Icon, Row } from 'antd';

const WeeklyReportHeader = ({ startDate, endDate, onPreviousWeek, onNextWeek }) => {
    return (
        <Row type="flex" justify="space-between">
            <Col span={4}>
                <Button onClick={onPreviousWeek} type="link" size="small">
                    <Icon type="left" />
                </Button>
                <Icon type="calendar" /> Week {endDate.isoWeek()}
                <Button onClick={onNextWeek} type="link" size="small">
                    <Icon type="right" />
                </Button>
            </Col>
            <Col span={4}>
                {startDate.format('ll')} - {endDate.format('ll')}
            </Col>
        </Row>
    );
};

export default WeeklyReportHeader;
