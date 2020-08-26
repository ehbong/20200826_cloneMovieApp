import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL} from './../../Config';
import MainImage from './Section/MainImage';

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState(null);
    useEffect(() => {
       //const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
       const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;

        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setMovies(res.results);
            setMainMovie(res.results[0]);
        })

    }, []);

    return (
       <div style={{ width: '100%', margin: '0' }}>
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

                    {/* Movie Grid Cards */}

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>Load More</button>
            </div>
       </div>
    )
}

export default LandingPage
