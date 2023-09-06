import React from "react";

const MyImg=({option}) => {
    return(
        <div>
         <img src={option.src}></img>
         </div>
    )
}

export default MyImg;