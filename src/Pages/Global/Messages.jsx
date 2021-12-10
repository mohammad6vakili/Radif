import React, { useState } from 'react';
import "./Messages.css";
import { useHistory } from 'react-router-dom';
import Colors from '../../Helper/Colors';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";


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
            <div className='messages-items'>
                <div onClick={()=>history.push("/dashboard/messages/message")}>
                    <img src={bankLogo} alt="bank logo" />
                    <div>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <span style={{fontSize:"16px"}}>بانک شهر - شعبه شریعتی</span>
                            <div className='messages-items-badge'>۳</div>
                            <span style={{color:"rgb(51, 65, 85)"}}>امروز</span>
                        </div>
                        <div style={{color:"rgb(51, 65, 85)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Messages;