import React from 'react';
import "./MyProcess.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import settingImage from "../../Assets/Images/setting-button.svg";
import yellowLabel from "../../Assets/Images/yellow-label.svg";
import greenLabel from "../../Assets/Images/green-label.svg";
import redLabel from "../../Assets/Images/red-label.svg";


const MyProcess=()=>{

    const history=useHistory();

    return(
        <div className='my-process dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='my-process-list'>
                <div>
                    <img className='my-process-item-setting-button' src={settingImage} alt="setting" />
                    <div className='my-process-item-setting-label'>
                        <img src={yellowLabel} alt="label" />
                        <span>در حال حضور</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyProcess;