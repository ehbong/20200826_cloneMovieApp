import React, { useState, useEffect, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { withRouter } from "react-router-dom";
import CastInfo from "./Sections/CastInfo";
import GridCards from "./../commons/GridCards";
import { Row } from 'antd';

function CastDetail(props) {
    const buttonRef = useRef(null);
    let castId = props.match.params.castId;
    const endpointsearchMovie = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&page=1&with_cast=${castId}`;
    const endpointCastInfo = `${API_URL}person/${castId}?api_key=${API_KEY}&language=ko`;
    
    const [Cast, setCast] = useState({});
    const [CastMovieList, setCastMovieList] = useState([]);
    const [CurrentPage, setCurrentPage] = useState(0);


    useEffect(() => {
        fetch(endpointCastInfo)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setCast(res);
            //setActor(res.cast);
        })
        fetchMovie(endpointsearchMovie);
        // 스크롤 이벤트
        window.addEventListener('scroll', scrollHandler, true);
        return () => {
            window.removeEventListener('scroll', scrollHandler, true);
        }
    }, []);
    // 스크롤 이벤트 핸들러
    const scrollHandler = (e) => {
        if( document.body.scrollHeight == window.scrollY + window.innerHeight ) {
            buttonRef.current.click();
        }
    }
    // 출현작 카드 형식으로 보여주기
    const gridcards = CastMovieList.map((obj, idx)=>{
        return <GridCards key={idx} 
                movieId={obj.id} 
                movieName={obj.original_title}
                image={obj.poster_path ? `${IMAGE_BASE_URL}w300${obj.poster_path}` : null}/>
    });

    const fetchMovie = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setCastMovieList([...CastMovieList, ...res.results]);
            setCurrentPage(res.page);
        })
    }

    const loadMoreItems = () => {
        console.log(CurrentPage);
        const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&page=${CurrentPage+1}&with_cast=${castId}`;
        fetchMovie(endpoint);
    }

    return (
        <div>
            {CastInfo && 
                <div style={{ display: 'absolute', marginLeft: '25%' }}>
                    <img src={`${IMAGE_BASE_URL}w400${Cast.profile_path}`} alt={Cast.name}/>
                </div>
            }
            {<div style={{ width: '85%', margin: '1rem auto' }}>
                {CastInfo && <CastInfo 
                    cast={Cast}
                />}
                <br/>
                    <h2>Filmography</h2>
                    <hr/>
                    {CastMovieList && 
                    <Row gutter={[16, 16]}>
                        {gridcards}
                    </Row>
                    }
            </div>}
            <div style={{ display: 'none', justifyContent: 'center' }}>
                <button ref={buttonRef} onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default withRouter(CastDetail);
