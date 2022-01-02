import React, { useState , useEffect } from 'react';
import "./Messages.css";
import { useHistory } from 'react-router-dom';
import Colors from '../../Helper/Colors';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import axios from 'axios';
import { toast } from 'react-toastify';
import Env from "../../Constant/Env.json";
import loadingSvg from "../../Assets/Animations/loading.svg";


const Messages=()=>{
    const history=useHistory();
    const [loading , setLoading]=useState(false);
    const [messages , setMessages]=useState([]);
    const array = [1,2,3,4,5,6,7];

    const getMessages=async()=>{
        const token = localStorage.getItem("token");
        try{
            setLoading(true);
            const response = await axios.get(Env.baseUrl + "/notification/notification-list",{
                headers:{
                    "Authorization":"Token "+token
                }
            })
            setLoading(false);
            setMessages(response.data.ContentData);
        }catch({err , response}){
            toast.error(response.data.detail,{
                position:"bottom-left"
            });
            setLoading(false);
            console.log(err);
        }
    }

    useEffect(()=>{
        getMessages();
    },[])

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
                {loading===true ?
                    <img width={"50px"} src={loadingSvg} alt="loading" />
                    :
                    array.map((data)=>(
                        <div onClick={()=>history.push("/dashboard/messages/message")}>
                            <img style={{width:"40px"}} src={bankLogo} alt="bank logo" />
                            <div>
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <span style={{fontSize:"16px"}}>بانک شهر - شعبه شریعتی</span>
                                    <div className='messages-items-badge'>۳</div>
                                    <span style={{color:"rgb(51, 65, 85)"}}>امروز</span>
                                </div>
                                <div style={{color:"rgb(51, 65, 85)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Messages;