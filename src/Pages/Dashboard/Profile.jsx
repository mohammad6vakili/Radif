import React, { useState , useEffect} from 'react';
import "./Profile.css";
import { useDispatch , useSelector} from 'react-redux';
import { Button , Switch , Modal , Input} from 'antd';
import { setProfile } from '../../Store/Action';
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
// import assets
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import profileExit from "../../Assets/Images/profile-exit.svg";
import editIcon from "../../Assets/Images/edit-profile-icon.svg";
import loadingSvg from "../../Assets/Animations/loading.svg";



const Profile=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const profile = useSelector(state=>state.Reducer.profile);
    const [tab , setTab]=useState(0);
    const [loading , setLoading]=useState(false);
    const [getMail , setGetMail]=useState(false);
    const [getNews , setGetNews]=useState(false);
    const [mailModal , setMailModal]=useState(false);
    const [newsModal , setNewsModal]=useState(false);
    const [logModal , setLogModal]=useState(false);

    const getUserProfile=async()=>{
        const token = localStorage.getItem("token");
        setLoading(true);
        try{
            const response = await axios.get(Env.baseUrl + "/accounts/profile/",{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
            setLoading(false);
            dispatch(setProfile(response.data.ContentData));
        }catch({err , response}){
            setLoading(false);
            if(response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                history.push("/dashboard/home");
                toast.error(response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const changeMail=(e)=>{
        e.preventDefault();
        setMailModal(false)
        setGetMail(true);
    }

    const changeNews=(e)=>{
        e.preventDefault();
        setNewsModal(false)
        setGetNews(true);
    }

    const logout=()=>{
        history.push("/login");
        localStorage.removeItem("token");
    }

    useEffect(()=>{
        getUserProfile();
    },[])

    return(
        <>
        {loading ?
        <div className='loading-wrapper'>
            <img src={loadingSvg} alt="loading" />
        </div>
        :
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
            <Modal 
                visible={logModal}
                closable={false}
                onOk={()=>setLogModal(false)}
                wrapClassName="calendar-wrape-modal"
                className='calendar-modal profile-logout-modal'
                onCancel={()=>setLogModal(false)}
                bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                footer={[]}
            >
                <div className='get-mail-modal-body'>
                    <div style={{width:"100%",textAlign:"center",margin:"10px 0 20px 0",fontSize:"12px",color:Colors.secondary}}>
                        برای خروج از برنامه مطمئن هستید؟
                    </div>
                    <div className='profile-log-modal-btns'>
                        <Button onClick={()=>setLogModal(false)}>بی خیال !</Button>
                        <Button onClick={logout} className='green-btn'>خروج از حساب کاربری</Button>
                    </div>
                </div>
            </Modal>
            <div className='profile-page-name'>
                <span style={{color:Colors.secondary}}>حساب کاربری</span>
                <span 
                    onClick={()=>setLogModal(true)} 
                    style={{cursor:"pointer"}}
                >
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
                        <Switch 
                            checked={getMail===true} 
                            onClick={()=>getMail===false ? setMailModal(true) : setGetMail(false)} 
                            size="small" 
                        />
                    </div>
                    <div className='profile-setting-item'>
                        <span>دریافت خبرنامه</span>
                        <Switch 
                            checked={getNews===true} 
                            onClick={()=>getNews===false ? setNewsModal(true) : setGetNews(false)} 
                            size="small" 
                        />
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
                    <Modal 
                        visible={mailModal}
                        closable={false}
                        onOk={()=>setMailModal(false)}
                        wrapClassName="calendar-wrape-modal"
                        className='calendar-modal get-mail-modal'
                        onCancel={()=>setMailModal(false)}
                        bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                        style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                        footer={[]}
                    >
                        <div className='get-mail-modal-body'>
                            <div style={{width:"100%",textAlign:"center",margin:"10px 0 20px 0",fontSize:"12px",color:Colors.secondary}}>
                                برای دریافت ایمیل و خبرنامه ، آدرس ایمیل خود را وارد کنید
                            </div>
                            <div style={{width:"100%",textAlign:"right",margin:"10px 0 4px 0",fontSize:"12px",color:Colors.secondary}}>پست الکترونیکی</div>
                            <form onSubmit={changeMail}>
                                <Input 
                                    placeHolder="test@gmail.com"
                                    className='edit-profile-input'
                                    required
                                    type={"email"}
                                    style={{textAlign:"left",marginBottom:"20px"}}
                                />
                                <Button
                                    className="green-btn submit-btn"
                                    htmlType='submit'
                                >
                                    ثبت آدرس ایمیل
                                </Button>
                            </form>
                        </div>
                    </Modal>
                    <Modal 
                        visible={newsModal}
                        closable={false}
                        onOk={()=>setNewsModal(false)}
                        wrapClassName="calendar-wrape-modal"
                        className='calendar-modal get-mail-modal'
                        onCancel={()=>setNewsModal(false)}
                        bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                        style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                        footer={[]}
                    >
                        <div className='get-mail-modal-body'>
                            <div style={{width:"100%",textAlign:"center",margin:"10px 0 20px 0",fontSize:"12px",color:Colors.secondary}}>
                                برای دریافت ایمیل و خبرنامه ، آدرس ایمیل خود را وارد کنید
                            </div>
                            <div style={{width:"100%",textAlign:"right",margin:"10px 0 4px 0",fontSize:"12px",color:Colors.secondary}}>پست الکترونیکی</div>
                            <form onSubmit={changeNews}>
                                <Input 
                                    placeHolder="test@gmail.com"
                                    required
                                    className='edit-profile-input'
                                    type={"email"}
                                    style={{textAlign:"left",marginBottom:"20px"}}
                                />
                                <Button
                                    className="green-btn submit-btn"
                                    htmlType='submit'
                                >
                                    ثبت آدرس ایمیل
                                </Button>
                            </form>
                        </div>
                    </Modal>
                </div>
            }
        </div>
        }
        </>
    )
}
export default Profile;