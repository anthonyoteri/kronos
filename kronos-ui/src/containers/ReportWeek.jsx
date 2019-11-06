import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Row } from 'antd';

import moment from 'moment';
import WeeklyReportTable from '../components/WeeklyReportTable';

class ReportWeek extends Component {
    state = {};

    render() {
        const { projects, records } = this.props;

        return (
            <Card>
                <Row>
                    <Col style={{ paddingBottom: 8 }} span={24}>
                        <WeeklyReportTable currentDate={moment()} />
                    </Col>
                </Row>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.projects,
    records: state.records.list,
});

export default connect(mapStateToProps)(ReportWeek);
