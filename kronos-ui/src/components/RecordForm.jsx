import React, { Component } from 'react';

import { Col, DatePicker, Form, Modal, Row, Select } from 'antd';
import moment from 'moment';

class RecordForm extends Component {
    initialState = {
        id: null,
        project: null,
        startTime: null,
        stopTime: null,
    };

    state = { ...this.initialState };

    setProject = e => {
        this.setState({ project: e });
    };

    setStartTime = (date, dateString) => {
        this.setState({ startTime: date });
    };

    setStopTime = (date, dateString) => {
        this.setState({ stopTime: date });
    };

    submit = () => {
        const { onOk } = this.props;
        const { id, project, startTime, stopTime } = this.state;

        const data = {
            id: id,
            project: project,
            startTime: startTime ? moment(startTime.valueOf()).toISOString() : null,
            stopTime: stopTime ? moment(stopTime.valueOf()).toISOString() : null,
        };

        onOk(data);
    };

    disabledStartTime = startTime => {
        const { stopTime } = this.state;
        if (!startTime || !stopTime) {
            return false;
        }
        return startTime.valueOf() > stopTime.valueOf();
    };

    disabledStopTime = stopTime => {
        const { startTime } = this.state;
        if (!startTime || !stopTime) {
            return false;
        }
        return startTime.valueOf() > stopTime.valueOf();
    };

    componentDidUpdate = (prevProp, prevState) => {
        const { data } = this.props;

        if (prevProp !== this.props) {
            if (data) {
                this.setState({
                    id: data.id,
                    project: data.project,
                    startTime: data.startTime ? moment(data.startTime) : null,
                    stopTime: data.stopTime ? moment(data.stopTime) : null,
                });
            }
        }
    };

    render() {
        const { visible, title, projects, onCancel } = this.props;
        const { project, startTime, stopTime } = this.state;
        const timeFormat = 'ddd MMM Do, Y h:mm A';

        const filteredProjects = [...projects].filter(p => !p.locked);

        return (
            <Modal visible={visible} title={title} onCancel={onCancel} onOk={this.submit}>
                <Form>
                    <Form.Item label="Project">
                        <Select onChange={this.setProject} value={project}>
                            {filteredProjects.map(p => (
                                <Select.Option key={p.slug} value={p.slug}>
                                    {p.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Time Range">
                        <Row>
                            <Col span={12}>
                                <DatePicker
                                    placeholder="Start"
                                    value={startTime}
                                    format={timeFormat}
                                    disabledDate={this.disabledStartTime}
                                    showTime
                                    onChange={this.setStartTime}
                                />
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    placeholder="Stop"
                                    value={stopTime}
                                    format={timeFormat}
                                    disabledDate={this.disabledStopTime}
                                    showTime
                                    onChange={this.setStopTime}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default RecordForm;
