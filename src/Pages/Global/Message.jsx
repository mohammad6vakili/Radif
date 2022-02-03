import React,{useEffect} from 'react';
import "./Message.css";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FormatHelper from '../../Helper/FormatHelper';
import backBtn from "../../Assets/Images/back-btn.svg";
import topBg from "../../Assets/Images/message-top-bg.svg";
import moment from 'jalali-moment';
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';



const Message=()=>{

    const history=useHistory();
    const message=useSelector(state=>state.Reducer.message);

    const seenMessage=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/notification/mark-notifications-as-read/",{
                obb_id:message.messages[0].id
            },
            {
                headers:{
                    "Authorization":"Token "+token
                }
            }
            )
            console.log(response.data.ContentData.notifications);
        }catch({err , response}){
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
        if(message){
            seenMessage();
        }
    },[])

    return(
        <>
        {message &&
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
                    {message.messages.map((data,index)=>(
                        <div key={index} className='message-item'>
                            <span>
                                {FormatHelper.toPersianString(moment(data.date).locale('fa').format('jYYYY/jM/jD - HH:mm'))}
                            </span>
                            <div>{data.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        }
        </>
    )
}
export default Message;