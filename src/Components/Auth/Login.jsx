import React, { useState } from 'react';
import "./Login.css";
import { useHistory } from 'react-router';
import ReactCodeInput from "react-code-input";
import vectorOne from "../../Assets/Images/login-vector-one.svg";
import vectorTwo from "../../Assets/Images/login-vector-two.svg";
import penImage from "../../Assets/Images/pen-green.svg";
import { Button, Input } from 'antd';
import Colors from "../../Helper/Colors";
import FormatHelper from "../../Helper/FormatHelper";
import Countdown from "react-countdown";
import { toast } from 'react-toastify';



const Login =()=>{
    const history=useHistory();
    const [step , setStep]=useState(0);
    const [mobile , setMobile]=useState("");
    const [nationalNumber , setNationalNumber]=useState("");
    const [isCount , setIsCount]=useState(false);


    const getCode=()=>{
        if(mobile===""){
            toast.warning("لطفا شماره موبایل خود را وارد کنید",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else if(nationalNumber===""){
            toast.warning("لطفا کد ملی خود را وارد کنید",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else if(mobile!=="" && mobile.length!==11){
            toast.warning("شماره موبایل وارد شده باید 11 رقم باشد",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else if(nationalNumber!=="" && nationalNumber.length!==10){
            toast.warning("کدملی وارد شده باید 10 رقم باشد",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else{
            toast.success("کد تایید با موفقیت برای شما ارسال شد",{
                position: toast.POSITION.BOTTOM_LEFT
            });
            setStep(1);
            setIsCount(true);
        }
    }


    const sendCode=(e)=>{
        if(e.length===5){
            history.push("/dashboard/home");
            toast.success("خوش آمدید",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }
    }

    const renderer = ({ minutes, seconds}) => {
        return <span>{minutes}:{seconds}</span>;
    };

    return(
        <div className="login page-wrap">
            {step===0 &&
                <>
                    <img src={vectorOne} alt="login" />
                    <div>
                        <span>شماره موبایل</span>
                        <Input
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                            type="tel"
                            placeholder="شماره موبایل باید 11 رقم باشد" 
                        />
                    </div>
                    <div style={{marginTop:"15px"}}>
                        <span>کد ملی</span>
                        <Input
                            value={nationalNumber}
                            onChange={(e)=>setNationalNumber(e.target.value)}
                            type="tel"
                            placeholder="کدملی باید 10 رقم باشد" 
                        />
                    </div>
                    <div className="bottom-btn-box">
                        <Button 
                            onClick={getCode}
                            className="green-btn submit-btn"
                        >
                            دریافت رمز یک بار مصرف
                        </Button>
                    </div>
                </>
            }
            {step===1 &&
                <>
                    <img src={vectorTwo} alt="login" />
                    {isCount ?
                        <>
                            <span 
                                style={{marginTop:"2vh",width:"150px",fontSize:"16px",textAlign:"center",zIndex:"999",color:Colors.black}}
                            >
                                کد ۵ رقمی به شماره همراه {FormatHelper.toPersianString(mobile)} ارسال شد
                            </span>
                            <div className="timer">
                                <Countdown 
                                    date={Date.now() + 120000}
                                    autoStart={true} 
                                    zeroPadTime={2}
                                    renderer={renderer}
                                    onComplete={()=>setIsCount(false)}
                                />
                            </div>
                        </>
                        :
                        <>
                            <span style={{zIndex:"9999",marginTop:"22vh"}}>کد تایید ارسال نشد؟</span>
                            <span onClick={getCode} style={{color:Colors.green,zIndex:"9999",cursor:"pointer"}}>ارسال مجدد کد تایید</span>
                        </>
                    }
                    <ReactCodeInput
                        type='number'
                        fields={5} 
                        onChange={(e)=>sendCode(e)}
                    />
                    <div onClick={()=>setStep(0)} className="correct-number">
                        <img src={penImage} alt="edit" />
                        <span style={{color:Colors.green,marginRight:"5px",paddingTop:"2px"}}>اصلاح شماره همراه</span>
                    </div>
                    <div className="bottom-btn-box">
                        <Button 
                            onClick={sendCode}
                            className="green-btn submit-btn"
                        >
                            ورود به حساب کاربری 
                        </Button>
                    </div>
                </>
            }
        </div>
    )
}
export default Login;