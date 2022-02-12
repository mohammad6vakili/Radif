import React,{useState,useEffect} from 'react';
import "./Wallet.css";
import Colors from "../../Helper/Colors";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import walletVector from "../../Assets/Images/wallet.svg";
import FormatHelper from "../../Helper/FormatHelper"; 
import {Input,Button} from 'antd';
import { toast } from 'react-toastify';


const Wallet=()=>{

    const history=useHistory();

    const [val , setVal]=useState("");

    useEffect(()=>{
        if(val.length>0){
            setVal(FormatHelper.toPersianString(val.toLocaleString()))
        }
    },[val])

    return(
        <div className='wallet dashboard-page'>
            <div style={{marginBottom:"0"}} className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <img src={walletVector} alt="wallet" />
            <div style={{textAlign:"right",fontSize:"16px",color:Colors.secondary}}>موجودی شما</div>
            <div style={{textAlign:"center",fontSize:"34px",fontWeight:"700",color:"#64748B"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px",color:Colors.secondary}}>ریال</span></div>
            <div className='wallet-suggest-price'>
                <Button onClick={()=>setVal("100000")}>۱۰۰,۰۰ ریال</Button>
                <Button onClick={()=>setVal("200000")}>۲۰۰,۰۰ ریال</Button>
                <Button onClick={()=>setVal("300000")}>۳۰۰,۰۰ ریال</Button>
            </div>
            <Input
                type={"tel"}
                value={val.toLocaleString()}
                style={{marginBottom:"20px"}}
                onChange={(e)=>setVal(e.target.value)}
                className='edit-profile-input'
                placeholder='مبلغ دلخواه خود را به ریال وارد کنید'
            />
            <div className='bottom-btn-box'>
                <Button
                    style={{minHeight:"40px"}}
                    onClick={()=>{
                        if(val.length>0){
                            toast.warning("بخش پرداخت هنوز راه اندازی نشده",{
                            position:"bottom-left"
                        })}else{
                            toast.warning("لطفا مبلغ مورد نظر خود را وارد کنید",{
                                position:"bottom-left"
                            })  
                        }
                    }}
                    className="green-btn submit-btn"
                >
                    پرداخت
                </Button>
            </div>
        </div>
    )
}
export default Wallet;