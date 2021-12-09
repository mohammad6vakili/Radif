import React, { useState } from 'react';
import "./Profile.css";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setNotif } from '../../Store/Action';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import profileExit from "../../Assets/Images/profile-exit.svg";
import { Button } from 'antd';



const Profile=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const [tab , setTab]=useState(0);

    return(
        <div className='profile dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='profile-page-name'>
                <span style={{color:Colors.secondary}}>حساب کاربری</span>
                <span style={{cursor:"pointer"}}>
                    <img style={{marginLeft:"5px"}} src={profileExit} alt="exit" />خروج از حساب کاربری
                </span>
            </div>
            <div className='profile-tab-btn'>
                <Button
                    style={{borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    نمایش اطلاعات کاربری
                </Button>
                <Button
                    style={{borderRadius:"1000px 0 0 1000px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    تنظیمات حساب کاربری
                </Button>
            </div>
        </div>
    )
}
export default Profile;