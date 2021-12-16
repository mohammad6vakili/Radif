import React from 'react';
import "./Support.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import supportVector from "../../Assets/Images/support-vector.svg";
import mailIcon from "../../Assets/Images/mail.svg";
import phoneIcon from "../../Assets/Images/phone-number.svg";


const Support=()=>{

    const history=useHistory();

    return(
        <div className='support dashboard-page'>
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
                <span style={{color:Colors.secondary}}>پشتیبانی</span>
            </div>
            <div style={{width:"100%",marginTop:"10px",fontSize:"12px",lineHeight:"1.8",textAlign:"justify",color:Colors.secondary}}>
                <span style={{fontWeight:"700",fontSize:"16px"}}>کاربر گرامی  ، </span>
                <br />
                همکاران ما در تیم پشتیبانی صف همواره آماده پاسخگویی به مشکلات ، پیشنهادات و انتقادات شما هستند .
            </div>
            <a href="tel:09390624049" className='support-box'>
                <img src={phoneIcon} alt="phone number" />
                <span style={{direction:"ltr",marginRight:"10px",color:Colors.secondary}}>۰۲۱ - ۳۴۶ - ۳۳۱۱۲</span>
            </a>
            <div onClick={()=>history.push("/dashboard/support/ticket")} className='support-box'>
                <img src={mailIcon} alt="send message" />
                <span style={{marginRight:"10px",color:Colors.secondary}}>ارسال پیام</span>
            </div>
            <img src={supportVector} style={{height:"47vh"}} alt="support" />
        </div>
    )
}
export default Support;