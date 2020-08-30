import React from 'react';
import { Col,  Typography} from 'antd';

function GridCards(props) {
    if(props.movieId){
        return (
            <Col lg={6} md={8} xs={24} >
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.movieName}/>
                    </a>
                </div>            
            </Col>
        )
    }else{
        return (
            <Col lg={6} md={8} xs={24} >
                <div style={{ position: 'relative' }}>
                    <a href={`/cast/${props.castId}`}>
                        <img style={{ width: '100%', height: '320px' }} src={props.image} alt={props.characterName}/>
                    </a>
                </div>
                <Typography.Title level={4}>{props.characterName}</Typography.Title>
            </Col>
        ) 
    }
}

export default GridCards
