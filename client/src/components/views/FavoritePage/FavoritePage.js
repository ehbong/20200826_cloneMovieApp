import React, { useEffect, useState, useRef } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import './Favorite.css';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Popover } from 'antd';

function FavoritePage(props) {

    const [FavoriteMovies, setFavoriteMovies] = useState([]);
    const [Movies, setMovies] = useState([]);
    //const MoviesRef = useRef(Movies);
    let list = [];
    //MoviesRef.current = list;
    const [Complate, setComplate] = useState(false);
    // const [User, setUser] = useState({});
    // if(props.user){
    //     setUser(props.user);
    // }
    //const { userData } = useSelector(state => state.user);
    //console.log(props.user);
    useEffect(() => {
        fetchFavoreMovie();
    }, [])

    const fetchFavoreMovie = ()=> {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem("userId") })
            .then(res => {
                if(res.data.success){
                    //console.log(res.data.favoriteList);
                    setFavoriteMovies(res.data.favoriteList);
                    console.log(FavoriteMovies);
                    

                } else {
                    alert('즐겨찾기 정보를 받아오지 못했습니다.');
                }
            })
    }
    useEffect(() => {
        FavoriteMovies.map((obj, idx) => {
                        //console.log(obj);
                        const endpointInfo = `${API_URL}movie/${obj.movieTo}?api_key=${API_KEY}&language=ko`;
                        fetch(endpointInfo)
                            .then(res => res.json())
                            .then(res => {
                                //console.log(res);
                                //const newList = Movies.concat(res);
                                //setMovies(newList);
                                //updateMovieList(res);
                                list.push(res);
                                // console.log(list);
                                // console.log(Movies.current);
                                // console.log(Movies.current.length);
                                // console.log(FavoriteMovies.length);
                                if(list.length == FavoriteMovies.length){
                                    setMovies(list);
                                }
                                //setMovies({...Movies, })
                        })
                        
                    });
    }, [FavoriteMovies])

    const onClickRemove = (movieId, userId) => {
        console.log(movieId);
        console.log(userId);
        Axios.post("/api/favorite/unFavorite", {movieId: movieId, userFrom: userId})
        .then(res => {
            if(res.data.success){
                fetchFavoreMovie();
            } else {
                alert('즐겨찾기 삭제를 못했습니다.');
            }
        })
    }
    const favoriteMovieList = Movies.map((data, idx) => {
            //console.log(data);
            const content = (
                <div>
                    {data.backdrop_path ?
                        <img src={`${IMAGE_BASE_URL}w1280${data.backdrop_path}`} alt={`${data.original_title}`}/>
                        : 'no image'
                    }
                </div>
            )
            return <tr key={idx}>
                <Popover content={content} title={`${data.original_title}`}>
                    <td>{data.original_title}</td>
                </Popover>
                <td>{data.runtime} min</td>
                <td><button onClick={()=> onClickRemove(data.id, localStorage.getItem("userId"))}>Remove</button></td>
            </tr>
        });
    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>

                    { favoriteMovieList }
                </tbody>
            </table>
        </div>
    )
}

export default withRouter(FavoritePage);
