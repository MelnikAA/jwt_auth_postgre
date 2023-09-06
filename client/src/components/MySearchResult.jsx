import React from "react";
import MyFilmInfo from "./MyFilmInfo";

const MySearchResult=({films}) => {
    return(
        <div>
            {films.map((film) =>
      <MyFilmInfo film={film} key={films.id}/>)}
        </div>
    )
}

export default MySearchResult;