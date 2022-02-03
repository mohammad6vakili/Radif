import React,{useState} from 'react';
import "./SelectRole.css";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Radio , Button} from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'jalali-moment';
import FormatHelper from '../../Helper/FormatHelper';
import Env from "../../Constant/Env.json";
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import greenClock from "../../Assets/Images/green-clock.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";
import { useEffect } from 'react';



const SelectRole=()=>{

    const history=useHistory();
    const [role , setRole]=useState("0");
    
    const saf = useSelector(state=>state.Reducer.saf);
    const serviceName = useSelector(state=>state.Reducer.serviceName);
    const selectedTurn = useSelector(state=>state.Reducer.selectedTurn);

    const goNextLevel=()=>{
        console.log(role);
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
            <div onClick={()=>console.log(saf.branch_address)} className="dashboard-page-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/selected-result")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={bankLogo} alt="bank" />
                </div>
                <span>{serviceName} در {saf && saf.brand_name}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={calendarIcon} alt="calendar" />
                </div>
                <span>
                    {selectedTurn && FormatHelper.toPersianString(moment(selectedTurn.time.toString()).locale('fa').format('jYYYY/jM/jD'))}
                </span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={locationIcon} alt="location" />
                </div>
                <span>{saf && saf.branch_address}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <div>
                    <img src={greenClock} alt="time" />
                </div>
                <span>{selectedTurn && FormatHelper.toPersianString(moment(selectedTurn.time.toString()).locale('fa').format('HH:mm'))}</span>
            </div>
            <div style={{width:"100%",height:"1px",background:"#CBD5E1",margin:"10px 0"}}></div>
            <Radio.Group 
                value={role}
                onChange={(e)=>setRole(e.target.value)}
            >
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