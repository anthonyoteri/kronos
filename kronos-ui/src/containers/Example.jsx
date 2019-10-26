import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';

import { createProject, updateProject, deleteProject } from '../store/projects/actions';
import { deleteRecord } from '../store/records/actions';

import ProjectForm from '../components/ProjectForm';
import ProjectTable from '../components/ProjectTable';
import RecordTable from '../components/RecordTable';

class Example extends Component {
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
        const { projects, records } = this.props;

        return (
            <div>
                <Button
                    onClick={() => {
                        this.setState({ createDialogOpen: true });
                    }}
                    type="primary"
                    icon="plus"
                >
                    Create
                </Button>

                <ProjectTable
                    projects={projects.list}
                    onEdit={project => {
                        this.setState({ editDialogData: project, editDialogOpen: true });
                    }}
                    onDelete={this.onDeleteProject}
                />
                <RecordTable
                    records={records.list}
                    onEdit={record => console.log('Edit button pressed ', record)}
                    onDelete={record => console.log('Delete button confirmed ', record)}
                />
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
            </div>
        );
    }
}

const mapStatesToProps = state => ({
    projects: state.projects,
    records: state.records,
});

export default connect(mapStatesToProps)(Example);
