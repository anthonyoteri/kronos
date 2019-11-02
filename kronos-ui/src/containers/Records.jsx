import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Col, Row } from 'antd';

import { createRecord, updateRecord, deleteRecord } from '../store/records/actions';

import RecordForm from '../components/RecordForm';
import RecordTable from '../components/RecordTable';

class Projects extends Component {
    state = {
        createDialogOpen: false,
        editDialogOpen: false,
        editDialogData: null,
    };

    onCreateRecord = record => {
        const { dispatch } = this.props;
        dispatch(createRecord(record));

        this.setState({ createDialogOpen: false });
    };

    onEditRecord = record => {
        const { dispatch } = this.props;
        dispatch(updateRecord(record));

        this.setState({ editDialogOpen: false });
    };

    onDeleteRecord = record => {
        const { dispatch } = this.props;
        dispatch(deleteRecord(record.id));
    };

    render() {
        const { records, projects } = this.props;

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
                            disabled={projects.filter(p => !p.locked).length === 0}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <RecordTable
                            records={records}
                            projects={projects}
                            onEdit={record => {
                                this.setState({ editDialogData: record, editDialogOpen: true });
                            }}
                            onDelete={this.onDeleteRecord}
                        />
                    </Col>
                </Row>
                <RecordForm
                    title="Create Record"
                    visible={this.state.createDialogOpen}
                    projects={projects}
                    onOk={this.onCreateRecord}
                    onCancel={() => this.setState({ createDialogOpen: false })}
                />
                <RecordForm
                    title="Edit Record"
                    visible={this.state.editDialogOpen}
                    projects={projects}
                    data={this.state.editDialogData}
                    onOk={this.onEditRecord}
                    onCancel={() => this.setState({ editDialogOpen: false })}
                />
            </Card>
        );
    }
}

const mapStatesToProps = state => ({
    records: state.records.list,
    projects: state.projects.list,
});

export default connect(mapStatesToProps)(Projects);
