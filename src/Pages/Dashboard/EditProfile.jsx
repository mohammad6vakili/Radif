import React, { useState,useRef } from 'react';
import "./EditProfile.css";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'jalali-moment'
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar,utils} from "react-modern-calendar-datepicker";
import FormatHelper from "../../Helper/FormatHelper";
import {Button,Input,Radio,Modal} from 'antd';
import Colors from "../../Helper/Colors";
import {toast} from "react-toastify";
import axios from 'axios';
import Env from "../../Constant/Env.json";


const EditProfile=()=>{

    const history=useHistory();
    const submitRef = useRef();
    const [loading , setLoading]=useState(false);
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const [calModal , setCalModal]=useState(false);
    const [name , setName]=useState("");
    const [family , setFamily]=useState("");
    const [nationalCode , setNationalCode]=useState("");
    const [gender , setGender]=useState("");
    const [phone , setPhone]=useState("");
    const [email , setEmail]=useState("");

    const profile=useSelector(state=>state.Reducer.profile);


    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
    }

    const editUserProfile=async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token");
        if(nationalCode===""){
            toast.warning("لطفا کد ملی خود را وارد کنید",{
                position:"bottom-left"
            });
        }else if(nationalCode.length!==10){
            toast.warning("کد ملی وارد شده باید 10 رقم باشد",{
                position:"bottom-left"
            });
        }else if(name===""){
            toast.warning("لطفا نام خود را وارد کنید",{
                position:"bottom-left"
            });
        }else if(family===""){
            toast.warning("لطفا نام خانوادگی خود را وارد کنید",{
                position:"bottom-left"
            });
        }else{
            try{
                setLoading(true);
                const response = await axios.post(Env.baseUrl + "/accounts/profile/",
                {
                    "first_name": name,
                    "last_name": family,
                    "national_code": FormatHelper.toEnglishString(nationalCode),
                    "birthday": moment.from(FormatHelper.toEnglishString(date.replace("/","-").replace("/","-")), 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    "gender": gender,
                    "phone": FormatHelper.toEnglishString(phone),
                    "email": FormatHelper.toEnglishString(email)
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                })
                setLoading(false);
                if(response.data.Header.Status===200){
                    history.push("/dashboard/profile");
                    toast.success("تغییرات با موفقیت ذخیره شد",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                }else{
                    toast.error("شماره تلفن وارد شده صحیح نیست",{
                        position:"bottom-left"
                    });
                }
            }catch({err , response}){
                setLoading(false);
                if(response && response.status===401){
                    localStorage.clear();
                    history.push("/login");
                    toast.error("شما از برنامه خارج شده اید",{
                        position:"bottom-left"
                    });
                }else{
                    toast.error("خطا در برقراری ارتباط",{
                        position:"bottom-left"
                    });
                }
            }
        }
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
            <form onSubmit={editUserProfile} className='profile-infos'>
                    <div style={{opacity:".6"}}>
                        <span>شماره همراه <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            className='edit-profile-input'
                            value={profile && FormatHelper.toPersianString(profile.username)}
                            disabled
                        />
                    </div>
                    <div>
                        <span>کدملی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            className='edit-profile-input'
                            value={nationalCode}
                            onChange={(e)=>setNationalCode(e.target.value)}
                            type="tel"
                        />
                    </div>
                    <div>
                        <span>نام <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>نام خانوادگی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input' 
                            value={family}
                            onChange={(e)=>setFamily(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>شماره ثابت</span>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <span>جنسیت</span>
                        <Radio.Group onChange={(e)=>setGender(e.target.value)}>
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
                            required
                            className='edit-profile-input'
                            type="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className='bottom-btn-box'>
                        <Button
                            className="green-btn submit-btn"
                            htmlType='submit'
                            ref={submitRef}
                        >
                            ذخیره
                        </Button>
                    </div>
            </form>
                <Modal 
                    visible={calModal}
                    closable={false}
                    onOk={()=>setCalModal(false)}
                    wrapClassName="calendar-wrape-modal"
                    className='calendar-modal'
                    onCancel={()=>setCalModal(false)}
                    bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                    style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                    footer={[]}
                >
                    <Calendar
                        value={calDate}
                        onChange={(val)=>setCalDate(val)}
                        shouldHighlightWeekends
                        colorPrimary={Colors.green}
                        locale="fa"
                        calendarClassName="responsive-calendar"
                    />
                    <Button
                        onClick={selectDateSubmit}
                        className="green-btn submit-btn"
                    >
                        تایید
                    </Button>
                </Modal>
        </div>
    )
}
export default EditProfile;