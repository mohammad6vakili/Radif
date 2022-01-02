import React,{useState} from 'react';
import "./Ticket.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import { Input , Button} from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import Env from "../../Constant/Env.json";
const { TextArea } = Input;

const Ticket=()=>{

    const history=useHistory();
    const [text , setText]=useState("");
    const [loading , setLoading]=useState(false);

    const sendTicket=async()=>{
        const token = localStorage.getItem("token");
        if(text.length<10){
            toast.warning("متن ارسالی باید حداقل ۶ کاراکتر باشد",{
                position:"bottom-left"
            });
        }else{
            setLoading(true);
            try{
                const response = await axios.post(Env.baseUrl + "/support/new-ticket/",
                {
                    content:text
                },
                {
                    headers:{
                        "Authorization":"Token "+token
                    }
                }
                );
                toast.success("پیام شما با موفقیت به پشتیبانی ارسال شد",{
                    position: toast.POSITION.BOTTOM_LEFT
                });
                setLoading(false);
                history.push("/dashboard/support");
            }catch({err , response}){
                console.log(err);
                setLoading(false);
                toast.error("خطا در برقراری ارتباط",{
                    position:"bottom-left"
                });
            }    
        }
    }

    return(
        <div className='ticket dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/support")}>
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
            <div style={{width:"100%",textAlign:"right",marginTop:"20px",fontSize:"12px",color:Colors.secondary}}>پیام خود را وارد کنید .</div>
            <div style={{marginTop:"10px",width:"100%"}}>
                <TextArea 
                    value={text} 
                    onChange={(e)=>setText(e.target.value)} 
                    showCount 
                    maxLength={500}
                />
            </div>
            <div className='bottom-btn-box'>
                    <Button
                        loading={loading}
                        className="green-btn submit-btn"
                        onClick={sendTicket}
                    >
                        ارسال پیام
                    </Button>
                </div>
        </div>
    )
}
export default Ticket;