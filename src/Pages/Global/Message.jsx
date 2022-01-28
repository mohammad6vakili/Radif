import React from 'react';
import "./Message.css";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import topBg from "../../Assets/Images/message-top-bg.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";



const Message=()=>{

    const history=useHistory();
    const message=useSelector(state=>state.Reducer.message);

    return(
        <div className='message dashboard-page'>
            <div className="dashboard-page-header">
                <img style={{position:"absolute",zIndex:"-1",width:"120%",right:"-10px"}} src={topBg} alt="bg" />
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div className="message-username">
                    <img src={message.brand_logo} alt="bank logo" />
                    <div>{message.brand_name} - {message.obb_name}</div>
                </div>
            </div>
            <div className='message-items'>
                {message.messages.map((data)=>(
                    <div className='message-item'>
                        <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                        <div>{data.content}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Message;