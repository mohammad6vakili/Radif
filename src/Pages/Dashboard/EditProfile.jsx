import React, { useState,useRef } from 'react';
import "./EditProfile.css";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from "react-modern-calendar-datepicker";
import FormatHelper from "../../Helper/FormatHelper";
import {Button,Input,Radio,Modal} from 'antd';
import {toast} from "react-toastify";


const EditProfile=()=>{

    const history=useHistory();
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const submitRef = useRef();
    const [calModal , setCalModal]=useState(false);

    const updateProfile=()=>{
        history.push("/dashboard/profile");
        toast.success("تغییرات با موفقیت ذخیره شد",{
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
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
            <Modal 
                visible={calModal}
                closable={false}
                onOk={()=>setCalModal(false)}
                className='calendar-modal'
                onCancel={()=>setCalModal(false)}
                style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                footer={[]}
            >
                <Calendar
                    value={calDate}
                    onChange={(val)=>setCalDate(val)}
                    shouldHighlightWeekends
                    locale="fa"
                    calendarClassName="responsive-calendar"
                />
                <Button
                    style={{marginTop:"20px"}}
                    onClick={selectDateSubmit}
                    className="green-btn submit-btn"
                >
                    تایید
                </Button>
            </Modal>
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
                            <Input 
                                onFocus={()=>{setCalModal(true);submitRef.current.focus();}}
                                placeholder='تاریخ تولد خود را وارد کنید'
                                value={date}
                                className='edit-profile-input'
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
                        ref={submitRef}
                    >
                        ذخیره
                    </Button>
                </div>
        </div>
    )
}
export default EditProfile;