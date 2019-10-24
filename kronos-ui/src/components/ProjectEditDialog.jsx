import React, { Component } from "react";
import { Modal, Form, Input, Checkbox, Icon } from "antd";

class ProjectEditDialog extends Component {
  state = {
    name: "",
    description: "",
    locked: false
  };

  setName = e => this.setState({ name: e.target.value });
  setDescription = e => this.setState({ description: e.target.value });
  setLocked = e => this.setState({ locked: e.target.checked });

  submit = async () => {
    const { onClose, onOk } = this.props;
    const { name, description, locked } = this.state;

    const project = { ...this.props.data };
    project.name = name;
    project.description = description;
    project.locked = locked;

    onOk(project);
    onClose();
  };

  componentDidUpdate(prevProp) {
    if (prevProp !== this.props) {
      this.init();
    }
  }

  init = () => {
    const { name, description, locked } = this.props.data;
    this.setState({ name, description, locked });
  };

  render() {
    const { name, description, locked } = this.state;
    const { open, onClose } = this.props;

    return (
      <Modal
        visible={open}
        title="Edit project"
        onOk={this.submit}
        onCancel={onClose}
      >
        <Form>
          <Form.Item lable="Name">
            <Input value={name} onChange={this.setName} placeholder="Name" />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={description}
              onChange={this.setDescription}
              placeholder="Description"
            />
          </Form.Item>
          <Form.Item>
            <Checkbox checked={locked} onChange={this.setLocked}>
              <Icon type="lock" /> Lock Project
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ProjectEditDialog;
