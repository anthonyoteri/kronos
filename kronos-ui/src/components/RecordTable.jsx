import React from 'react';

import { Button, Popconfirm, Table } from 'antd';

import moment from 'moment';

const RecordTable = ({ header, records, projects, onEdit, onDelete }) => {
    const calendarFormat = {
        lastWeek: 'dddd MMM Do [at] h:mm A',
        sameElse: 'dddd MMM Do [at] h:mm A',
    };

    const columns = [
        {
            title: 'Project',
            dataIndex: 'project',
            key: 'project',
            render: (text, record) => projects.find(p => p.slug === record.project).name,
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
            key: 'startTime',
            render: (text, record) => moment(record.startTime).calendar(null, calendarFormat),
        },
        {
            title: 'Stop Time',
            dataIndex: 'stopTime',
            key: 'stopTime',
            render: (text, record) => (record.stopTime ? moment(record.stopTime).calendar(null, calendarFormat) : '--'),
        },
        {
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (text, record) => moment.duration(record.duration).humanize(),
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
