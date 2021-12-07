import React, { useState } from 'react';
import "./Login.css";
import vectorOne from "../../Assets/Images/login-vector-one.svg";
import vectorTwo from "../../Assets/Images/login-vector-two.svg";
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';



const Login =()=>{

    const [step , setStep]=useState(0);
    const [mobile , setMobile]=useState("");
    const [nationalNumber , setNationalNumber]=useState("");

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
        }
    }

    return(
        <div className="login page-wrap">
            {step===0 &&
                <>
                    <img src={vectorOne} alt="login" />
                    <div style={{marginTop:"20vh"}}>
                        <span>شماره موبایل</span>
                        <Input
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                            type="tel"
                            placeholder="شماره موبایل باید 11 رقم باشد" 
                        />
                    </div>
                    <div>
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
        </div>
    )
}
export default Login;