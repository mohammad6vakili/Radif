import React, { useState } from 'react';
import "./EditProfile.css";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from "react-modern-calendar-datepicker";
import {Button,Input,Radio,Modal} from 'antd';
import {toast} from "react-toastify";


const EditProfile=()=>{

    const history=useHistory();
    const [date , setDate]=useState(null);

    const updateProfile=()=>{
        history.push("/dashboard/profile");
        toast.success("تغییرات با موفقیت ذخیره شد",{
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    return(
        <div className='edit-profile dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/profile")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='profile-infos'>
                    <div style={{opacity:".6"}}>
                        <span>نام <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                            value={"محمد علی"}
                            disabled
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>نام خانوادگی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                            value={"وکیلی دوست"} 
                            disabled
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>کدملی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                            value={"4311320167"} 
                            disabled
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>شماره همراه <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                            value={"۰۹۳۹۰۶۲۴۰۴۹"} 
                            disabled
                        />
                    </div>
                    <div>
                        <span>شماره ثابت</span>
                        <Input
                            type="tel"
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <span>جنسیت</span>
                        <Radio.Group>
                            <Radio value={"مرد"}>مرد</Radio>
                            <Radio value={"زن"}>زن</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <span>تاریخ تولد</span>
                            <DatePicker
                                value={date}
                                inputPlaceholder={" "}
                                onChange={setDate}
                                shouldHighlightWeekends
                                locale="fa"
                            />
                    </div>
                    <div>
                        <span>آدرس ایمیل</span>
                        <Input 
                            className='edit-profile-input'
                            type="email"
                        />
                    </div>
                </div>
                <div className='bottom-btn-box'>
                    <Button
                        className="green-btn submit-btn"
                        onClick={updateProfile}
                    >
                        ذخیره
                    </Button>
                </div>
        </div>
    )
}
export default EditProfile;