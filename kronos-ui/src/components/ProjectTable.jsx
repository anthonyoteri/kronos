import React from 'react';
import { Button, Icon, Popconfirm, Table } from 'antd';

const ProjectTable = ({ projects, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            defaultSortOrder: 'ascend',
            render: (text, record) => (
                <span>
                    {record.locked && <Icon type="lock" />} {record.name}
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
        },
        {
            title: 'Last Used',
            dataIndex: 'lastUsed',
            key: 'lastUsed',
        },
        {
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button icon="edit" type="link" onClick={() => onEdit(record)} />

                    <Popconfirm
                        title="Are you sure you want to delete this project"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => onDelete(record)}
                    >
                        <Button icon="delete" type="link" disabled={record.lastUsed !== null} />
                    </Popconfirm>
                </span>
            ),
        },
    ];
    return <Table columns={columns} dataSource={projects} rowKey="id" />;
};

export default ProjectTable;
