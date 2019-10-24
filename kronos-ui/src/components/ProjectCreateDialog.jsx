import React, { Component } from "react";
import { Modal, Form, Input } from "antd";

class ProjectCreateDialog extends Component {
  state = {
    name: "",
    description: ""
  };

  setName = e => this.setState({ name: e.target.value });
  setDescription = e => this.setState({ description: e.target.value });

  componentDidUpdate(prevProp) {
    if (prevProp !== this.props) {
      this.reset();
    }
  }

  reset = () =>
    this.setState({
      name: "",
      description: ""
    });

  submit = async () => {
    const { onClose, onOk } = this.props;
    const { name, description } = this.state;
    console.log(
      "Submit button pressed with name " +
        name +
        " and description " +
        description
    );

    onOk({ name, description });
    onClose();
  };

  render() {
    const { open, onClose } = this.props;

    return (
      <Modal
        visible={open}
        title="Add project"
        onOk={this.submit}
        onCancel={onClose}
      >
        <Form>
          <Form.Item lable="Name">
            <Input
              value={this.state.name}
              onChange={this.setName}
              placeholder="Name"
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              value={this.state.description}
              onChange={this.setDescription}
              placeholder="Description"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default ProjectCreateDialog;
