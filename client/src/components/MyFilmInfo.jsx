import React from "react";
import ReactRouterDOM from 'react-dom'
import MyButton from "./UI/button/MyButton";



const MyFilmInfo=(props) => {
    const Link = ReactRouterDOM.Link;
    return(
        <div className="film">
            <div className="film_info">
                {
                    props.film.poster==null
                    ?
                    <img className="poster"  src='data:image/jpeg;base64,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'></img>
                    :
                    <img className="poster"  src={props.film.poster.previewUrl}></img>

}           
                    <div>
                    <a href={`https://www.kinopoisk.ru/film/${props.film.id}`}>{props.film.name}</a>
                    
                     {props.film.year} 
                     </div>
            
            <div className="post__btns">
                <MyButton >
                    Добавить
                </MyButton>
            </div>
        </div>
        </div>
    )
}

export default MyFilmInfo;