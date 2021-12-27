import React,{useState} from 'react';
import "./Payment.css";
import { useHistory } from 'react-router-dom';
import { Checkbox, Radio , Button } from 'antd';
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import walletIcon from "../../Assets/Images/wallet-pay.svg";
import locationPayIcon from "../../Assets/Images/location-pay.svg";


const Payment=()=>{    
    const history=useHistory();
    
    return(
        <div className='dashboard-page payment'>
            <div className="dashboard-page-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/select-role")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <div style={{color:Colors.bigGray,width:"100%",textAlign:"right",fontSize:"12px"}}>مبلغ قابل پرداخت</div>
            <div style={{color:Colors.green,fontSize:"38px"}}>۱۰۵,۰۰۰<span style={{fontSize:"12px",marginRight:"5px"}}>ریال</span></div>
            <div style={{marginTop:"20px",width:"100%",textAlign:"right",fontSize:"12px"}}>نحوه پرداخت را انتخاب کنید</div>
            <Radio.Group style={{width:"100%"}}>
                <div className='payment-item-box'>
                    <Radio value={"0"}>
                        <img src={walletIcon} alt="wallet" />
                        <span>پرداخت از کیف پول </span>
                        <span style={{fontSize:"10px"}}>(۱۲۰,۰۰۰ ریال موجودی)</span>
                    </Radio>
                </div>
                <div className='payment-item-box'>
                    <Radio value={"1"}>
                        <img src={locationPayIcon} alt="pay in location" />
                        <span>پرداخت نقدی در محل</span>
                    </Radio>
                </div>
                <div className='payment-item-box payment-item-box-big'>
                    <div style={{display:"flex",alignItems:"center"}}>
                        <img src={locationPayIcon} alt="pay in location" />
                        <span>پرداخت آنلاین</span>
                    </div>
                        <div className='payment-bank-items'>
                            <div>
                                <Radio value={"2"}>
                                    <div>
                                        <img src={bankLogo} alt="bank" />
                                    </div>
                                </Radio>
                            </div>
                            <div>
                                <Radio value={"3"}>
                                    <div>
                                        <img src={bankLogo} alt="bank" />
                                    </div>
                                </Radio>
                            </div>
                            <div>
                                <Radio value={"4"}>
                                    <div>
                                        <img src={bankLogo} alt="bank" />
                                    </div>
                                </Radio>
                            </div>
                        </div>
                </div>
            </Radio.Group>
            <div style={{margin:"10px 0 20px 0",width:"100%",textAlign:"right"}}>
                <Checkbox style={{fontSize:"11px"}}>
                    <span style={{color:Colors.green,textDecoration:"underline"}}>قوانین و مقررات صف</span> {" "}
                    را مطالعه کردم و با آنها موافق هستم.
                </Checkbox>
            </div>
            <div className='bottom-btn-box'>
                <Button
                    className="green-btn submit-btn"
                    onClick={()=>history.push("/dashboard/process/success")}
                >
                    تایید و پرداخت
                </Button>
            </div>
        </div>
        )
}    
export default Payment;