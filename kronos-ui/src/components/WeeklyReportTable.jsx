import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Badge, Table, Tooltip } from 'antd';

class WeeklyReportTable extends Component {
    state = {};

    render() {
        const { days, data } = this.props;
        const dataSource = rotate(transform(days, data));

        const columns = [
            {
                key: 'project',
                title: 'Project',
                dataIndex: 'project',
                sorter: (a, b) => a.project.localeCompare(b.project),
            },
            ...days.map(d => ({
                key: d.unix(),
                title: () => (
                    <Tooltip title={d.format('MMMM Do')}>
                        {d.isSame(d.clone().startOf('month')) ? (
                            <Badge status="warning">{d.format('dddd')}</Badge>
                        ) : (
                            d.format('dddd')
                        )}
                    </Tooltip>
                ),
                dataIndex: d.format('YYYY-MM-DD'),
                render: (text, record) =>
                    record[d.format('YYYY-MM-DD')]
                        ? moment.duration(record[d.format('YYYY-MM-DD')] * 1000).humanize()
                        : null,
            })),
            ,
        ];

        return <Table columns={columns} dataSource={dataSource} rowKey="project" pagination={false} />;
    }
}

const transform = (days, data) => {
    const result = {};
    for (let i = 0; i < data.length; i++) {
        let dow = days[i].format('YYYY-MM-DD');
        for (let project of Object.keys(data[i])) {
            if (result.hasOwnProperty(project)) {
                result[project][dow] = data[i][project];
            } else {
                result[project] = { [dow]: data[i][project] };
            }
        }
    }
    return result;
};

const rotate = data => {
    const table = [];
    for (let p of Object.keys(data)) {
        table.push({ ...data[p], project: p });
    }
    return table;
};

const mapStateToProps = state => ({
    projects: state.projects.list,
    records: state.records.list,
});

export default connect(mapStateToProps)(WeeklyReportTable);
