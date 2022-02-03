import React, { useState , useEffect } from 'react';
import "./Messages.css";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setMessage } from '../../Store/Action';
import Colors from '../../Helper/Colors';
import moment from "jalali-moment";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import axios from 'axios';
import { toast } from 'react-toastify';
import Env from "../../Constant/Env.json";
import loadingSvg from "../../Assets/Animations/loading.svg";
import FormatHelper from '../../Helper/FormatHelper';


const Messages=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const [loading , setLoading]=useState(false);
    const [messages , setMessages]=useState(null);

    
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
            if(response.data.ContentData.length===0){
                setMessages([]);
            }else{
                setMessages(response.data.ContentData.notifications);
            }
        }catch({err , response}){
            setLoading(false);
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                history.push("/dashboard/home");
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
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
                    {messages===null &&
                        <div className='loading-wrapper'>
                            <img src={loadingSvg} alt="loading" />
                        </div>
                    }
                    {messages && messages.map((data)=>(
                        <div 
                            style={data.messages[messages.length-1].is_read===true ? {opacity:".5"} : {opacity:"1"}}
                            onClick={()=>{
                                history.push("/dashboard/messages/message");
                                dispatch(setMessage(data));
                            }}
                        >
                            <img style={{width:"40px"}} src={data.brand_logo} alt="bank logo" />
                            <div>
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <span style={{fontSize:"16px"}}>{data.brand_name} - {data.obb_name}</span>
                                    {/* <div className='messages-items-badge'>۳</div> */}
                                    {/* <div></div> */}
                                    <span style={{color:"rgb(51, 65, 85)",marginRight:"auto"}}>
                                        {FormatHelper.toPersianString(moment(data.messages[messages.length-1].date).locale('fa').format('jYYYY/jM/jD - HH:mm'))}
                                    </span>
                                </div>
                                <div style={{color:"rgb(51, 65, 85 , .7)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                                    {data.messages[messages.length-1].content}
                                </div>
                            </div>
                        </div>
                    ))
                }
                {messages && messages.length===0 && <div>در حال حاضر شما پیامی ندارید.</div>}
            </div>
        </div>
    )
}
export default Messages;