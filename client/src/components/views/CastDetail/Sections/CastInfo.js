import React from 'react'
import { Descriptions } from 'antd';

function CastInfo(props) {

    let { cast } = props;
    return (
        <Descriptions title="Profile" bordered>
            <Descriptions.Item label="name">{cast.name}</Descriptions.Item>
            <Descriptions.Item label="place_of_birth">{cast.place_of_birth}</Descriptions.Item>
            <Descriptions.Item label="birthday">{cast.birthday}</Descriptions.Item>
            <Descriptions.Item label="popularity" span={2}>
                {cast.popularity}
            </Descriptions.Item>
            <Descriptions.Item label="known_for_department">{cast.known_for_department}</Descriptions.Item>
            <Descriptions.Item label="biography">{cast.biography}</Descriptions.Item>
        </Descriptions>
    )
}

export default CastInfo
