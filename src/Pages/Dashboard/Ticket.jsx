import React from 'react';
import "./Ticket.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import { Input , Button} from 'antd';
import { toast } from 'react-toastify';
const { TextArea } = Input;

const Ticket=()=>{

    const history=useHistory();

    const sendTicket=()=>{
        history.push("/dashboard/support");
        toast.success("پیام شما با موفقیت به پشتیبانی ارسال شد",{
            position: toast.POSITION.BOTTOM_LEFT
        });
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
                <TextArea showCount maxLength={500}/>
            </div>
            <div className='bottom-btn-box'>
                    <Button
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