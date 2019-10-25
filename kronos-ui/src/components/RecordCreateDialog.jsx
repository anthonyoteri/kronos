import React, { Component } from "react";

import { Modal, Form, DatePicker, Select } from "antd";
import { listProjects } from "../api/projectList";

class RecordCreateDialog extends Component {
  state = {
    selectedProject: null,
    startTime: null,
    stopTime: null,
    stopOpen: false,
    projects: [],
    alert: null
  };

  disabledStartTime = startTime => {
    const { endTime } = this.state;
    if (!startTime || !endTime) {
      return false;
    }
    return startTime.valueOf() > endTime.valueOf;
  };

  disabledStopTime = stopTime => {
    const { startTime } = this.state;
    if (!stopTime || !startTime) {
      return false;
    }
    return stopTime.valueOf() <= startTime.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value
    });
  };

  onProjectChange = value => {
    this.onChange("selectedProject", value);
  };

  onStartChange = value => {
    this.onChange("startTime", value);
  };

  onStopChange = value => {
    this.onChange("stopTime", value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ stopOpen: true });
    }
  };
  handleStopOpenChange = open => {
    this.setState({ stopOpen: open });
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const handleSuccess = response => {
      this.setState({ projects: response.data });
    };
    const handleError = error => {
      this.setState({ alert: "No response from backend, it may be down" });
    };

    listProjects(handleSuccess, handleError);
    this.setState({ alert: null });
  };

  submit = async () => {
    const { onClose, onOk } = this.props;
    const { selectedProject, startTime, stopTime } = this.state;

    const data = {
      project: selectedProject,
      startTime: startTime ? new Date(startTime.valueOf()).toISOString() : null,
      stopTime: stopTime ? new Date(stopTime.valueOf()).toISOString() : null
    };

    onOk(data);
    onClose();
  };

  render() {
    const { open, onClose } = this.props;
    const { startTime, stopTime, stopOpen, projects } = this.state;

    const activeProjects = projects.filter(p => !p.locked);

    return (
      <Modal
        visible={open}
        title="Create record"
        onOk={this.submit}
        onCancel={onClose}
      >
        <Form>
          <Form.Item label="Project">
            <div>
              <Select onChange={this.onProjectChange} autoFocus allowClear>
                {activeProjects.map(p => (
                  <Select.Option key={p.slug} value={p.slug}>
                    {p.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </Form.Item>
          <Form.Item label="Start">
            <div>
              <DatePicker
                disabledDate={this.disabledStartTime}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={startTime}
                placeholder="Start"
                onChange={this.onStartChange}
                onOpenChange={this.handleStartOpenChange}
              />
            </div>
          </Form.Item>
          <Form.Item label="Stop">
            <div>
              <DatePicker
                disabledDate={this.disabledStopTime}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                value={stopTime}
                placeholder="Stop"
                onChange={this.onStopChange}
                open={stopOpen}
                onOpenChange={this.handleStopOpenChange}
              />
            </div>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default RecordCreateDialog;
