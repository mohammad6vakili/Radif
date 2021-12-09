import React, { useState } from 'react';
import "./Messages.css";
import { useHistory } from 'react-router-dom';
import Colors from '../../Helper/Colors';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";


const Messages=()=>{

    const history=useHistory();

    return(
        <div className='messages dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div style={{width:"100%",textAlign:"right"}}>
                <span style={{color:Colors.secondary}}>پیام ها</span>
            </div>
        </div>
    )
}
export default Messages;