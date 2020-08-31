import React, { useEffect, useState, useRef } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL} from './../../Config';
import MainImage from './Section/MainImage';
import GridCards from './../commons/GridCards';
import { Row } from 'antd';

let currentPage = 0;

function LandingPage() {
    const buttonRef = useRef(null);
    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    
    useEffect(() => {
       const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
       fetchMovie(endpoint);
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
    const gridcards = Movies.map((obj, idx)=>{
        return <GridCards key={idx} 
                movieId={obj.id} 
                movieName={obj.original_title}
                image={obj.poster_path ? `${IMAGE_BASE_URL}w300${obj.poster_path}` : null}/>
    });

    const fetchMovie = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovies([...Movies, ...res.results]);
            if(CurrentPage == 0) setMainMovie(res.results[0]);
            setCurrentPage(res.page);
        })
    }

    const loadMoreItems = () => {
        console.log(CurrentPage);
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${CurrentPage+1}`;
        fetchMovie(endpoint);
    }
    return (
       <div style={{ width: '100%', margin: '0' }} >
           {/* Main image */}
            {MainMovie && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovie.backdrop_path}`} 
                    title={MainMovie.original_title}
                    text={MainMovie.overview}
                    />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2>Movies by lastest</h2>
                    <hr/>
                    {Movies && 
                    <Row gutter={[16, 16]}>
                        {gridcards}
                    </Row>
                    }
                    {/* Movie Grid Cards */}

            </div>

            <div style={{ display: 'none', justifyContent: 'center' }}>
                <button ref={buttonRef} onClick={loadMoreItems}>Load More</button>
            </div>
       </div>
    )
}

export default LandingPage
