import React from 'react';
import moment from 'moment';

import { Button, Icon, Timeline } from 'antd';

const ActivityTimeline = ({ records, projects, onStop, now }) => {
    const calendarFormat = {
        lastWeek: 'dddd MMM Do [at] h:mm A',
        sameElse: 'dddd MMM Do [at] h:mm A',
    };

    return (
        <Timeline>
            {records.map(r => (
                <Timeline.Item key={r.id} color={r.stopTime !== null ? 'blue' : 'green'}>
                    <p>
                        {projects.find(p => p.slug === r.project).name}{' '}
                        {r.stopTime === null ? (
                            <Button type="link" onClick={() => onStop(r)}>
                                <Icon type="pause-circle" size="small" />
                                Stop
                            </Button>
                        ) : null}
                    </p>
                    <p>
                        {moment(r.startTime).calendar(null, calendarFormat)} for{' '}
                        {moment.duration((r.stopTime ? moment(r.stopTime) : now).diff(moment(r.startTime))).humanize()}
                    </p>
                </Timeline.Item>
            ))}
        </Timeline>
    );
};

export default ActivityTimeline;
