import React from 'react';
import "./Wallet.css";
import Colors from "../../Helper/Colors";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import walletVector from "../../Assets/Images/wallet.svg";
import {Input,Button} from 'antd';


const Wallet=()=>{

    const history=useHistory();

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
                <Button>۱۰۰,۰۰ ریال</Button>
                <Button>۲۰۰,۰۰ ریال</Button>
                <Button>۳۰۰,۰۰ ریال</Button>
            </div>
            <Input 
                type={"tel"}
                className='edit-profile-input'
                placeholder='مبلغ دلخواه خود را به ریال وارد کنید'
            />
            <div className='bottom-btn-box'>
                <Button 
                    className="green-btn submit-btn"
                >
                    پرداخت
                </Button>
            </div>
        </div>
    )
}
export default Wallet;