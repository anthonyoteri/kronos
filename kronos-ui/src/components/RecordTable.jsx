import React from 'react';

import { Button, Popconfirm, Table } from 'antd';

const RecordTable = ({ records, onEdit, onDelete }) => {
    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
        },
        {
            title: 'Stop Time',
            dataIndex: 'stopTime',
            key: 'stopTime',
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            key: 'actions',
            render: (text, record) => (
                <div>
                    <span>
                        <Button icon="edit" type="link" onClick={() => onEdit(record)} />
                    </span>
                    <Popconfirm
                        title="Are you sure you want to delete this record"
                        onConfirm={() => onDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button icon="delete" type="link" />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return <Table columns={columns} dataSource={records} rowKey={'id'} />;
};

export default RecordTable;
