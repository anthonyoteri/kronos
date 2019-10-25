import React, { Component } from "react";

import { Card, Row, Col, Button } from "antd";

import RecordCreateDialog from "../components/RecordCreateDialog";
import RecordTable from "../components/RecordTable";

class Dashboard extends Component {
  state = {
    isCreateOpen: false
  };

  handleCreate = data => {
    console.log("Data will be created soon...");
  };

  render() {
    const { isCreateOpen } = this.state;

    const handleOpenCreateModal = () => this.setState({ isCreateOpen: true });
    const handleCloseCreateModal = () => this.setState({ isCreateOpen: false });

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
            <Col style={{ paddingBottom: 8 }} span={24}>
              <RecordTable />
            </Col>
          </Row>
        </Card>
        <RecordCreateDialog
          open={isCreateOpen}
          onOk={this.handleCreate}
          onClose={handleCloseCreateModal}
        />
      </div>
    );
  }
}

export default Dashboard;
