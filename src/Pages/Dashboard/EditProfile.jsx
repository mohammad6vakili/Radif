import React, { useState } from 'react';
import "./EditProfile.css";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import {Button,Input,Radio,Modal} from 'antd';


const EditProfile=()=>{

    const history=useHistory();
    const [dateModal , setDateModal]=useState(false);
    const [date , setDate]=useState(null);

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
                        <Input onFocus={()=>setDateModal(true)} />
                        <Modal
                            closable={false}
                            visible={dateModal}
                            onCancel={()=>setDateModal(false)}
                            style={{bottom:0}}
                            className='date-picker-modal'
                            footer={[]}
                        >
                            <Calendar
                                value={date}
                                onChange={setDate}
                                shouldHighlightWeekends
                                locale="fa"
                            />
                        </Modal>
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
                        onClick={()=>history.push("/dashboard/profile/edit")}
                    >
                        ویرایش اطلاعات کاربری 
                    </Button>
                </div>
        </div>
    )
}
export default EditProfile;