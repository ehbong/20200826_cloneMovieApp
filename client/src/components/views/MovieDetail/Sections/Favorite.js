import React, { useEffect, useState } from 'react';
import Axios from 'axios';



function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    useEffect(() => {
        let variable = { movieTo: props.movieTo}
        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setFavoriteNumber(res.data.favoriteNumber);
                } else {
                    alert('즐겨찾기 수 정보를 받아오지 못했습니다.');
                }
            })

        let favoriteVariable = { movieTo: props.movieTo, userFrom: props.userFrom }
        Axios.post('/api/favorite/favorited', favoriteVariable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    setFavorited(res.data.favorited);
                } else {
                    alert('즐겨찾기 정보를 받아오지 못했습니다.');
                }
            })
    }, []);

    const onFavorite = () => {

        let favoritedVariable = {
            movieTo: props.movieTo,
            userFrom: props.userFrom
        }

        if(Favorited) {
            Axios.post('/api/favorite/unFavorite', favoritedVariable)
                .then(res => {
                    if(res.data.success){
                        console.log(res.data);
                        setFavorited(!Favorited);
                        setFavoriteNumber(FavoriteNumber -1);
                    } else {
                        alert('즐겨찾기 취소에 실패 했습니다.');
                    }
                })
        } else {
            Axios.post('/api/favorite/favorite', favoritedVariable)
                .then(res => {
                    if(res.data.success){
                        console.log(res.data);
                        setFavorited(!Favorited);
                        setFavoriteNumber(FavoriteNumber +1);
                    } else {
                        alert('즐겨찾기에 실패 했습니다.');
                    }
                })

        }
    }

    return (
        <div>
            <button 
            onClick={onFavorite}
            style={{
                backgroundColor: `${Favorited ?  '#AAAAAA' : '#CC0000'}`,
                borderRadius: '4px', color: 'white',
                padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}>
                {FavoriteNumber} { Favorited ? 'Favorite' : 'Not Favorite' }
            </button>
        </div>
    )
}

export default Favorite
