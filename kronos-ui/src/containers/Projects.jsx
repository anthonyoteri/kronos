import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Col, Row } from 'antd';

import { createProject, updateProject, deleteProject } from '../store/projects/actions';

import ProjectForm from '../components/ProjectForm';
import ProjectTable from '../components/ProjectTable';

class Projects extends Component {
    state = {
        createDialogOpen: false,
        editDialogOpen: false,
        editDialogData: null,
    };

    onCreateProject = project => {
        const { dispatch } = this.props;
        dispatch(createProject(project));

        this.setState({ createDialogOpen: false });
    };

    onEditProject = project => {
        const { dispatch } = this.props;
        dispatch(updateProject(project));

        this.setState({ editDialogOpen: false });
    };

    onDeleteProject = project => {
        const { dispatch } = this.props;
        dispatch(deleteProject(project.slug));
    };

    render() {
        const { projects } = this.props;

        return (
            <Card>
                <Row>
                    <Col style={{ paddingBottom: 8 }} span={24}>
                        <Button
                            onClick={() => {
                                this.setState({ createDialogOpen: true });
                            }}
                            type="primary"
                            icon="plus"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <ProjectTable
                            projects={projects}
                            onEdit={project => {
                                this.setState({ editDialogData: project, editDialogOpen: true });
                            }}
                            onDelete={this.onDeleteProject}
                        />
                    </Col>
                </Row>
                <ProjectForm
                    title="Create Project"
                    visible={this.state.createDialogOpen}
                    onOk={this.onCreateProject}
                    onCancel={() => this.setState({ createDialogOpen: false })}
                />
                <ProjectForm
                    title="Edit Project"
                    visible={this.state.editDialogOpen}
                    data={this.state.editDialogData}
                    onOk={this.onEditProject}
                    onCancel={() => this.setState({ editDialogOpen: false })}
                />
            </Card>
        );
    }
}

const mapStatesToProps = state => ({
    projects: state.projects.list,
});

export default connect(mapStatesToProps)(Projects);
