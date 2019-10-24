import React, { Component } from "react";
import { Alert, Table, Row, Col, Card, Button, Popconfirm, Icon } from "antd";

import slugify from "slugify";

import ProjectCreateDialog from "../components/ProjectCreateDialog";
import ProjectEditDialog from "../components/ProjectEditDialog";
import { listProjects, createProject } from "../api/projectList";
import { deleteProject, updateProject } from "../api/projectDetails";

class Settings extends Component {
  state = {
    isCreateOpen: false,
    isEditOpen: false,
    editData: { name: "", description: "", locked: false },
    projects: [],
    alert: ""
  };

  handleDelete(project) {
    console.log("Delete button clicked for " + project.name);

    const handleSuccess = request => {
      console.log("Project deleted successfully");
      const projects = this.state.projects.filter(p => p.name !== project.name);
      this.setState({ projects });
    };

    const handleError = error => {
      if (error.response == null) {
        this.setState({ alert: "No response from backend, it may be down" });
        return;
      }
      this.setState({ alert: JSON.stringify(error.response.data) });
    };

    deleteProject(project.slug, handleSuccess, handleError);
  }

  handleCreate = data => {
    const { name, description } = data;
    console.log("Create new project " + name + " description " + description);

    const handleSuccess = response => {
      const projects = [...this.state.projects];
      projects.push(response.data);
      this.setState({ projects });
    };

    const handleError = error => {
      if (error.response == null) {
        this.setState({ alert: "No response from backend, it may be down" });
        return;
      }
      this.setState({ alert: JSON.stringify(error.response.data) });
    };

    const newProject = {
      name: name,
      description: description,
      slug: slugify(name, { lower: true }),
      locked: false
    };

    createProject(newProject, handleSuccess, handleError);
  };

  handleEdit = project => {
    const handleSuccess = response => {
      const projects = this.state.projects.filter(
        p => p.slug !== response.data.slug
      );
      projects.push(response.data);
      this.setState({ projects });
    };

    const handleError = error => {
      if (error.response == null) {
        this.setState({ alert: "No response from backend, it may be down" });
        return;
      }
      this.setState({ alert: JSON.stringify(error.response.data) });
    };

    updateProject(project.slug, project, handleSuccess, handleError);
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
    this.setState({ alert: "" });
  };

  render() {
    const { isCreateOpen, isEditOpen, editData } = this.state;

    const handleOpenCreateModal = () => this.setState({ isCreateOpen: true });
    const handleCloseCreateModal = () => this.setState({ isCreateOpen: false });
    const handleOpenEditModal = record =>
      this.setState({ editData: record, isEditOpen: true });
    const handleCloseEditModal = () => this.setState({ isEditOpen: false });

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        defaultSortOrder: "ascend",
        render: (text, record) => (
          <span>
            {record.locked && <Icon type="lock" />} {record.name}
          </span>
        )
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        sorter: (a, b) => a.description.localeCompare(b.description)
      },
      {
        title: "Last Used",
        dataIndex: "lastUsed",
        key: "lastUsed"
      },
      {
        key: "actions",
        render: (actions, record) => (
          <span>
            <Button
              icon="edit"
              type="link"
              onClick={() => handleOpenEditModal(record)}
            />
            <Popconfirm
              title="Are you sure you want to delete this project"
              onConfirm={() => this.handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                icon="delete"
                type="link"
                disabled={record.lastUsed != null}
              />
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <div style={{ padding: 8 }}>
        <Card>
          <Row>
            <Col style={{ paddingBottom: 8 }} span={24}>
              <Button
                onClick={handleOpenCreateModal}
                type="primary"
                icon="plus"
              >
                Create
              </Button>
            </Col>
            <Col span={24}>
              {this.state.alert && (
                <Alert
                  message={this.state.alert}
                  type="error"
                  closable="true"
                />
              )}
              <Table
                columns={columns}
                dataSource={this.state.projects}
                rowKey="name"
              />
            </Col>
          </Row>
        </Card>
        <ProjectEditDialog
          open={isEditOpen}
          data={editData}
          onOk={this.handleEdit}
          onClose={handleCloseEditModal}
        />
        <ProjectCreateDialog
          open={isCreateOpen}
          onOk={this.handleCreate}
          onClose={handleCloseCreateModal}
        />
      </div>
    );
  }
}

export default Settings;
