import React from 'react';
import "./Home.css";
import hamIcon from "../../Assets/Images/ham-icon.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import { useDispatch } from 'react-redux';
import {setHamburger , setNotif} from "../../Store/Action";


const Home=()=>{

    const dispatch=useDispatch();

    return(
        <div className="home dashboard-page">
            <div className="dashboard-page-header">
                <div onClick={()=>dispatch(setHamburger(true))}>
                    <img src={hamIcon} alt="menu"/>
                </div>
                <div onClick={()=>dispatch(setNotif(true))}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
        </div>
    )
}
export default Home;