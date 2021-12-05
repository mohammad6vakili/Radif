import React from 'react';
import "./Pending.css";
import loadingGif from "../../Assets/Animations/loading.gif";


const Pending=()=>{
    return(
        <div className="pending">
            <img src={loadingGif} alt="loading" />
        </div>
    )
}
export default Pending;