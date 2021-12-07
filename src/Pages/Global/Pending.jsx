import React from 'react';
import "./Pending.css";
import loadingGif from "../../Assets/Animations/loading.gif";
import bgTop from "../../Assets/Images/pending-bg-top.svg";
import bgBottom from "../../Assets/Images/pending-bg-bottom.svg";
import logo from "../../Assets/Images/logo.svg";



const Pending=()=>{
    return(
        <div className="pending">
            <img src={logo} alt="logo" />
            <span>همه چیز ردیفه ...</span>
            <img className="pending-loading" src={loadingGif} alt="loading" />
            <img style={{position:"absolute",top:"0",left:"0"}} src={bgTop} alt="bg" />
            <img style={{position:"absolute",bottom:"0",right:"0"}} src={bgBottom} alt="bg" />
        </div>
    )
}
export default Pending;