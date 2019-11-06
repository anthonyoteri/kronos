import React, { Component } from 'react';

import slugify from 'slugify';

import { Checkbox, Form, Icon, Input, Modal } from 'antd';

class ProjectForm extends Component {
    initialState = {
        name: '',
        slug: '',
        description: '',
        locked: false,
    };

    state = { ...this.initialState };

    setName = e => {
        const { data } = this.props;
        const slug = data ? data.slug : slugify(e.target.value, { lower: true });
        this.setState({ name: e.target.value, slug });
    };

    setDescription = e => {
        this.setState({ description: e.target.value });
    };

    setLocked = e => {
        this.setState({ locked: e.target.checked });
    };

    submit = () => {
        const { onOk } = this.props;

        const localState = { ...this.state };
        onOk(localState);
    };

    componentDidUpdate = prevProp => {
        const { data } = this.props;

        if (prevProp !== this.props) {
            if (data) {
                this.setState({
                    name: data.name,
                    slug: data.slug,
                    description: data.description,
                    locked: data.locked,
                });
            }
        }
    };

    render() {
        const { visible, title, onCancel } = this.props;

        return (
            <Modal visible={visible} title={title} onCancel={onCancel} onOk={this.submit}>
                <Form>
                    <Form.Item label="Project Name">
                        <Input value={this.state.name} placeholder="Name" onChange={this.setName} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input
                            value={this.state.description}
                            placeholder="Description"
                            onChange={this.setDescription}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={this.state.locked} onChange={this.setLocked}>
                            <Icon type="lock" />
                            Lock Project
                        </Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default ProjectForm;
