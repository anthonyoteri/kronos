import React, { Component } from "react";
import { listRecords } from "../api/recordList";
import { Table, Button, Popconfirm } from "antd";

class RecordTable extends Component {
  state = {
    records: []
  };

  componentDidMount() {
    this.init();
  }

  init = () => {
    const handleSuccess = response => {
      this.setState({ records: response.data });
    };

    listRecords(handleSuccess, null);
  };

  render() {
    const { records } = this.state;

    const columns = [
      {
        title: "Project",
        dataIndex: "project",
        key: "project"
      },
      {
        title: "Start Time",
        dataIndex: "startTime",
        key: "startTime"
      },
      {
        title: "Stop Time",
        dataIndex: "stopTime",
        key: "stopTime"
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration"
      },
      {
        key: "actions",
        render: (text, record) => (
          <div>
            <span>
              <Button icon="edit" type="link" onClick={null} />
            </span>
            <Popconfirm
              title="Are you sure you want to delete this record"
              onConfirm={() => this.handleDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon="delete" type="link" />
            </Popconfirm>
          </div>
        )
      }
    ];

    return <Table columns={columns} dataSource={records} rowKey={"url"} />;
  }
}

export default RecordTable;
