import React, { useState } from 'react';
import "./Login.css";
import { useHistory } from 'react-router';
import ReactCodeInput from "react-code-input";
import vectorOne from "../../Assets/Images/new-vectors/login.svg";
import vectorTwo from "../../Assets/Images/new-vectors/login-2.svg";
import penImage from "../../Assets/Images/pen-green.svg";
import { Button, Input } from 'antd';
import Colors from "../../Helper/Colors";
import FormatHelper from "../../Helper/FormatHelper";
import Countdown from "react-countdown";
import { toast } from 'react-toastify';
import Env from "../../Constant/Env.json";
import axios from 'axios';



const Login =()=>{
    const history=useHistory();
    const [step , setStep]=useState(0);
    const [mobile , setMobile]=useState("");
    const [loading , setLoading]=useState(false);
    const [nationalNumber , setNationalNumber]=useState("");
    const [now , setNow]=useState(Date.now() + 120000)
    const [isCount , setIsCount]=useState(true);
    const [code , setCode]=useState("");


    const getCode=async()=>{
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
            setCode("");
            try{
                setLoading(true);
                const response = await axios.post(Env.baseUrl + "/accounts/register/",{
                    username:FormatHelper.toEnglishString(mobile),
                    national_code:FormatHelper.toEnglishString(nationalNumber)
                });
                if(response.data.success===true){
                    setStep(1);
                    toast.success(response.data.message,{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    setNow(Date.now() + 120000)
                    setIsCount(true)
                    setLoading(false);
                }else{
                    toast.error(response.data.message,{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    setLoading(false);
                }
            }catch({err,response}){
                setLoading(false);
                if(response && response.status===400){
                    toast.error(response.data.errors.username[0],{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }else{
                    toast.error("خطا در برقراری ارتباط",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
            }
        }
    }

    const getToken=async(e)=>{
        if(code.length===6){
            setLoading(true);
            try{
                const response=await axios.post(Env.baseUrl + "/accounts/verify/",{
                    username:FormatHelper.toEnglishString(mobile),
                    national_code:FormatHelper.toEnglishString(nationalNumber),
                    otp_code:FormatHelper.toEnglishString(code)
                })
                history.push("/dashboard/home");
                toast.success(response.data.message,{
                    position: toast.POSITION.BOTTOM_LEFT
                });
                setLoading(false);
                localStorage.setItem("token",response.data.token);
            }catch({err,response}){
                console.log(err);
                setLoading(false);
                if(response && response.data.message){
                    toast.error(response.data.message,{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }else{
                    toast.error("خطا در برقراری ارتباط",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }
            }
        }else if(code.length===0){
            toast.warning("لطفا کد تایید را وارد کنید",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }else{
            toast.warning("لطفا کد تایید را به صورت صحیح وارد کنید",{
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
                    <div style={loading ? {opacity:".5"} : {opacity:"1"}}>
                        <span>شماره موبایل</span>
                        <Input
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                            type="tel"
                            placeholder="شماره موبایل باید 11 رقم باشد" 
                        />
                    </div>
                    <div style={loading ? {opacity:".5",marginTop:"15px"} : {opacity:"1",marginTop:"15px"}}>
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
                            loading={loading}
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
                                    date={now}
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
                        disabled={loading}
                        fields={6}
                        value={code}
                        onChange={(e)=>setCode(e)}
                    />
                    <div onClick={()=>setStep(0)} className="correct-number">
                        <img src={penImage} alt="edit" />
                        <span style={{color:Colors.green,marginRight:"5px",paddingTop:"2px"}}>اصلاح شماره همراه</span>
                    </div>
                    <div className="bottom-btn-box">
                        <Button
                            loading={loading}
                            onClick={getToken}
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