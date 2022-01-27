import React,{useState,useEffect} from 'react';
import "./Transactions.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import loadingSvg from "../../Assets/Animations/loading.svg";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import calendarImage from "../../Assets/Images/calandar.svg";
import creditCardImage from "../../Assets/Images/creditcard.svg";
import moment from 'jalali-moment';
import axios from 'axios';
import FormatHelper from "../../Helper/FormatHelper";
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';


const Transactions=()=>{
    
    const history=useHistory();
    const [list , setList]=useState(null);

    const getTransactions=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get(Env.baseUrl + "/payment/payment-list/",{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
            if(response.data.Header.Status===400){
                setList([]);
            }else{
                setList(response.data.ContentData);
            }
            console.log(response.data.ContentData);
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
        getTransactions();
    },[])

    return(
        <div className='transactions dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='trans-item-wrapper'>
                {list && list.length===0 && <div style={{width:"100%",textAlign:"center",marginTop:"10vh"}}>موردی یافت نشد.</div>}
                {list && list.length>0 && list.map((trans)=>(
                    <div className='trans-inc'>
                        <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>{trans.name}</div>
                        <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>{FormatHelper.toPersianString(JSON.parse(trans.amount).toLocaleString())} <span style={{fontSize:"12px"}}>ریال</span></div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div>
                                <img src={calendarImage} alt="calendar"/>
                                <span style={{fontSize:"12px",color:Colors.secondary}}>
                                {trans.date!=="" && trans.date!==null ? FormatHelper.toPersianString(moment(trans.date.toString()).locale('fa').format('jYYYY/jM/jD HH:mm')) : "---"}</span>
                            </div>
                            {trans.reference_number &&
                                <div>
                                    <img src={creditCardImage} alt="calendar"/>
                                    <span style={{fontSize:"12px",color:Colors.secondary}}>{FormatHelper.toPersianString(trans.reference_number)}</span>
                                </div>
                            }
                        </div>
                    </div>
                ))}
                {list===null && 
                    <div className='loading-wrapper'>
                        <img src={loadingSvg} alt="loading" />
                    </div>
                }
                {/* <div className='trans-dec'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
export default Transactions;