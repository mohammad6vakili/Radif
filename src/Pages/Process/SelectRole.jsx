import React,{useState} from 'react';
import "./SelectRole.css";
import { useHistory } from 'react-router-dom';
import { Radio , Button} from 'antd';
import { toast } from 'react-toastify';
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import greenClock from "../../Assets/Images/green-clock.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";



const SelectRole=()=>{
    
    const history=useHistory();
    const [role , setRole]=useState("");
    
    const goNextLevel=()=>{
        if(role==="0"){
            history.push("/dashboard/process/payment");
        }else if(role==="1"){
            history.push("/dashboard/process/fillrole");
        }else{
            toast.warning("لطفا مشخص کنید برای چه کسی نوبت گرفته اید",{
                position:"bottom-left"
            })
        }
    }

    return(
        <div className='dashboard-page select-role'>
            <div className="dashboard-page-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/selected-result")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={bankLogo} alt="bank" />
                </div>
                <span>افتتاح حساب قرض الحسنه در بانک ایران زمین</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={calendarIcon} alt="calendar" />
                </div>
                <span>چهارشنبه - ۱۴۰۰/۰۲/۲۵</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={locationIcon} alt="location" />
                </div>
                <span>نارمک - میدان چهل و سوم</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <div>
                    <img src={greenClock} alt="time" />
                </div>
                <span>۰۰ : ۱۲</span>
            </div>
            <div style={{width:"100%",height:"1px",background:"#CBD5E1",margin:"10px 0"}}></div>
            <Radio.Group onChange={(e)=>setRole(e.target.value)}>
                <Radio value={"0"}>برای خودم نوبت گرفته ام</Radio>
                <Radio value={"1"}>برای شخص دیگری نوبت گرفته ام</Radio>
            </Radio.Group>
            <div className='bottom-btn-box'>
                <Button
                    className="green-btn submit-btn"
                    onClick={goNextLevel}
                >
                    مرحله بعد
                </Button>
            </div>
        </div>
    )
}
export default SelectRole;