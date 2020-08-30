import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Section/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from './../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Button, Row } from 'antd';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const user = useSelector(state => state.user);
    const [Movie, setMovie] = useState();
    const [Actor, setActor] = useState([]);
    const [ViewActorStatus, setViewActorStatus] = useState(false);
    console.log(user);
    console.log(props);
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
    
    useEffect(() => {
        fetch(endpointInfo)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setMovie(res);
        })

        fetch(endpointCrew)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setActor(res.cast);
        })
    }, [])
    const toggleActorViewHandler = ()=>{
        setViewActorStatus(!ViewActorStatus);
    }
    const gridcards = Actor.map((obj, idx)=>{
        return <React.Fragment key={idx}>
                    <GridCards  
                    characterName={obj.name}
                    castId={obj.id}
                    image={obj.profile_path ? `${IMAGE_BASE_URL}w500${obj.profile_path}` : `http://localhost:5000/web/image/baseImage.jpg`}/>
                </React.Fragment>
    });
    return (
        <div>
            {/* Header */}
            {Movie && 
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                    />
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                
                {Movie && user.userData && user.userData.isAuth && <Favorite movieTo={Movie.id} userFrom={user.userData._id} />}
                {/* Movie Info */}
                {Movie && <MovieInfo 
                    movie={Movie}
                />}
                <br/>
                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorViewHandler}>Toggle Actor View </Button>
                </div>
                {ViewActorStatus && 
                    <Row gutter={[16, 16]}>
                        {gridcards}
                    </Row>
                }
                
            </div>
        </div>
    )
}

export default withRouter(MovieDetail);
