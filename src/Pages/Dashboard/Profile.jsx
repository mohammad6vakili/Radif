import React, { useState } from 'react';
import "./Profile.css";
import { useDispatch } from 'react-redux';
import { Button , Switch} from 'antd';
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import profileExit from "../../Assets/Images/profile-exit.svg";
import editIcon from "../../Assets/Images/edit-profile-icon.svg";



const Profile=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const [tab , setTab]=useState(0);

    return(
        <div className='profile dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='profile-page-name'>
                <span style={{color:Colors.secondary}}>حساب کاربری</span>
                <span style={{cursor:"pointer"}}>
                    <img style={{marginLeft:"5px"}} src={profileExit} alt="exit" />خروج از حساب کاربری
                </span>
            </div>
            <div className='profile-tab-btn'>
                <Button
                    style={{borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    نمایش اطلاعات کاربری
                </Button>
                <Button
                    style={{borderRadius:"1000px 0 0 1000px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    تنظیمات حساب کاربری
                </Button>
            </div>
            {tab===0 &&
                <>
                <div className='profile-infos'>
                    <div>
                        <span>نام</span>
                        <span>محمد علی</span>
                    </div>
                    <div>
                        <span>نام خانوادگی</span>
                        <span>وکیلی دوست</span>
                    </div>
                    <div>
                        <span>کدملی</span>
                        <span>4311320167</span>
                    </div>
                    <div>
                        <span>تاریخ تولد</span>
                        <span>۱۳۴۴/۰۴/۰۴</span>
                    </div>
                    <div>
                        <span>جنسیت</span>
                        <span>مرد</span>
                    </div>
                    <div>
                        <span>شماره همراه</span>
                        <span>۰۹۳۹۰۶۲۴۰۴۹</span>
                    </div>
                    <div>
                        <span>آدرس ایمیل</span>
                        <span>mohammad6vakili@gmail.com</span>
                    </div>
                    <div>
                        <span>شماره تماس</span>
                        <span>۰۲۱-۲۲۳۳۴۴۴۵۵</span>
                    </div>
                </div>
                <div className='bottom-btn-box'>
                    <Button 
                        className="border-dark-btn submit-btn"
                        onClick={()=>history.push("/dashboard/profile/edit")}
                    >
                        <img style={{marginLeft:"5px"}} src={editIcon} alt="edit" />
                        ویرایش اطلاعات کاربری 
                    </Button>
                </div>
                </>
            }
            {tab===1 &&
                <div className='profile-setting'>
                    <div style={{width:"100%",textAlign:"right",fontSize:"14px"}}>اطلاع رسانی</div>
                    <div className='profile-setting-item'>
                        <span>دریافت پیامک یادآوری نوبت</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-item'>
                        <span>دریافت پیامک تراکنش ها</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-item'>
                        <span>دریافت ایمیل</span>
                        <Switch size="small" />
                    </div>
                    <div className='profile-setting-item'>
                        <span>دریافت خبرنامه</span>
                        <Switch size="small" />
                    </div>
                    <div className='profile-setting-seperate'></div>
                    <div style={{width:"100%",textAlign:"right",fontSize:"14px"}}>نقشه</div>
                    <div className='profile-setting-item'>
                        <span>دسترسی خودکار به موقعیت مکانی</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-seperate'></div>
                    <div className='profile-setting-item'>
                        <span>زبان برنامه</span>
                        <span style={{color:Colors.green}}>فارسی</span>
                    </div>
                </div>
            }
        </div>
    )
}
export default Profile;