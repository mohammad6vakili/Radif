import React, { useState , useEffect} from 'react';
import "./Profile.css";
import { useDispatch , useSelector} from 'react-redux';
import { Button , Switch , Modal , Input} from 'antd';
import { setProfile } from '../../Store/Action';
import { useHistory } from 'react-router-dom';
import FormatHelper from "../../Helper/FormatHelper";
import Colors from "../../Helper/Colors";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import moment from 'jalali-moment'
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
    const [email , setEmail]=useState("");
    
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("?????? ???? ???????????? ???????? ?????? ??????",{
                    position:"bottom-left"
                });
            }else{
                history.push("/dashboard/home");
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }


    const changeMail=(e)=>{
        e.preventDefault();
        if (email.match(validRegex)) {
            setMailModal(false);
            setGetMail(true);
            localStorage.setItem("getMail",true);
        }else{        
            toast.warning("???????? ?????????? ???????? ?????? ???????????? ??????",{
                position:"bottom-left"
            });
        }
    }

    const changeNews=(e)=>{
        e.preventDefault();
        if (email.match(validRegex)) {
            setNewsModal(false);
            setGetNews(true);
            localStorage.setItem("getNews",true);
        }else{        
            toast.warning("???????? ?????????? ???????? ?????? ???????????? ??????",{
                position:"bottom-left"
            });
        }
    }

    const logout=()=>{
        history.push("/login");
        localStorage.removeItem("token");
    }

    useEffect(()=>{
        if(localStorage.getItem("getMail")){
            setGetMail(true);
        }
        if(localStorage.getItem("getNews")){
            setGetNews(true);
        }
        getUserProfile();
    },[])

    return(
        <>
        {!profile ?
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
                        ???????? ???????? ???? ???????????? ?????????? ????????????
                    </div>
                    <div className='profile-log-modal-btns'>
                        <Button onClick={()=>setLogModal(false)}>???? ???????? !</Button>
                        <Button onClick={logout} className='green-btn'>???????? ???? ???????? ????????????</Button>
                    </div>
                </div>
            </Modal>
            <div className='profile-page-name'>
                <span style={{color:Colors.secondary}}>???????? ????????????</span>
                <span 
                    onClick={()=>setLogModal(true)} 
                    style={{cursor:"pointer"}}
                >
                    <img style={{marginLeft:"5px"}} src={profileExit} alt="exit" />???????? ???? ???????? ????????????
                </span>
            </div>
            <div className='profile-tab-btn'>
                <Button
                    style={{borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    ?????????? ?????????????? ????????????
                </Button>
                <Button
                    style={{borderRadius:"1000px 0 0 1000px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    ?????????????? ???????? ????????????
                </Button>
            </div>
            {tab===0 &&
                <>
                <div className='profile-infos'>
                    <div>
                        <span>??????</span>
                        <span>
                            {profile.first_name!=="" && profile.first_name!==null ? profile.first_name : "---"}
                        </span>
                    </div>
                    <div>
                        <span>?????? ????????????????</span>
                        <span>
                            {profile.last_name!=="" && profile.last_name!==null ? profile.last_name : "---"}
                        </span>
                    </div>
                    <div>
                        <span>??????????</span>
                        <span>
                            {profile.national_code!=="" && profile.national_code!==null ? FormatHelper.toPersianString(profile.national_code) : "---"}
                        </span>
                    </div>
                    <div>
                        <span>?????????? ????????</span>
                        <span>
                            {profile.birthday!=="" && profile.birthday!==null ? FormatHelper.toPersianString(moment(profile.birthday.toString()).locale('fa').format('YYYY/M/D')) : "---"}
                        </span>
                    </div>
                    <div>
                        <span>??????????</span>
                        <span>
                            {profile.gender!=="" && profile.gender!==null ? profile.gender : "---"}
                        </span>
                    </div>
                    <div>
                        <span>?????????? ??????????</span>
                        <span style={{direction:"ltr",textAlign:"right"}}>
                            {profile.username!=="" && profile.username!==null ? FormatHelper.toPersianString(profile.username) : "---"}
                        </span>
                    </div>
                    <div>
                        <span>???????? ??????????</span>
                        <span>
                            {profile.email!=="" && profile.email!==null ? FormatHelper.toPersianString(profile.email) : "---"}
                        </span>
                    </div>
                    <div>
                        <span>?????????? ????????</span>
                        <span style={{direction:"ltr",textAlign:"right"}}>
                            {profile.mobile!=="" && profile.mobile!=="None" && profile.mobile!==null ? FormatHelper.toPersianString(profile.mobile) : "---"}
                        </span>
                    </div>
                </div>
                <div className='bottom-btn-box'>
                    <Button 
                        className="border-dark-btn submit-btn"
                        onClick={()=>history.push("/dashboard/profile/edit")}
                    >
                        <img style={{marginLeft:"5px"}} src={editIcon} alt="edit" />
                        ???????????? ?????????????? ???????????? 
                    </Button>
                </div>
                </>
            }
            {tab===1 &&
                <div className='profile-setting'>
                    <div style={{width:"100%",textAlign:"right",fontSize:"14px"}}>?????????? ??????????</div>
                    <div className='profile-setting-item'>
                        <span>???????????? ?????????? ?????????????? ????????</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-item'>
                        <span>???????????? ?????????? ???????????? ????</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-item'>
                        <span>???????????? ??????????</span>
                        <Switch 
                            checked={getMail===true} 
                            onClick={()=>{
                                if(profile.email.length>0 && getMail===false){
                                    setGetMail(true);
                                    localStorage.setItem("getMail",true);
                                }else if(profile.email.length>0 && getMail===true){
                                    setGetMail(false);
                                    localStorage.removeItem("getMail");
                                }else{
                                    if(getMail===false)
                                    {
                                        setMailModal(true);
                                    }else{
                                        setGetMail(false);
                                        localStorage.removeItem("getMail");
                                    }
                                }
                                }
                            } 
                            size="small" 
                        />
                    </div>
                    <div className='profile-setting-item'>
                        <span>???????????? ??????????????</span>
                        <Switch 
                            checked={getNews===true} 
                            onClick={()=>{
                                if(profile.email.length>0 && getNews===false){
                                    setGetNews(true);
                                    localStorage.setItem("getNews",true);
                                }else if(profile.email.length>0 && getNews===true){
                                    setGetNews(false);
                                    localStorage.removeItem("getNews");
                                }else{
                                    if(getNews===false){
                                        setNewsModal(true);
                                    }else{
                                        setGetNews(false);
                                        localStorage.removeItem("getNews");
                                    }
                                }    
                            }} 
                            size="small" 
                        />
                    </div>
                    <div className='profile-setting-seperate'></div>
                    <div style={{width:"100%",textAlign:"right",fontSize:"14px"}}>????????</div>
                    <div className='profile-setting-item'>
                        <span>???????????? ???????????? ???? ???????????? ??????????</span>
                        <Switch size="small" defaultChecked />
                    </div>
                    <div className='profile-setting-seperate'></div>
                    <div className='profile-setting-item'>
                        <span>???????? ????????????</span>
                        <span style={{color:Colors.green}}>??????????</span>
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
                                ???????? ???????????? ?????????? ?? ?????????????? ?? ???????? ?????????? ?????? ???? ???????? ????????
                            </div>
                            <div style={{width:"100%",textAlign:"right",margin:"10px 0 4px 0",fontSize:"12px",color:Colors.secondary}}>?????? ????????????????????</div>
                            <form onSubmit={changeMail}>
                                <Input 
                                    placeHolder="test@gmail.com"
                                    className='edit-profile-input'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    type={"text"}
                                    style={{textAlign:"left",marginBottom:"20px"}}
                                />
                                <Button
                                    className="green-btn submit-btn"
                                    htmlType='submit'
                                >
                                    ?????? ???????? ??????????
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
                                ???????? ???????????? ?????????? ?? ?????????????? ?? ???????? ?????????? ?????? ???? ???????? ????????
                            </div>
                            <div style={{width:"100%",textAlign:"right",margin:"10px 0 4px 0",fontSize:"12px",color:Colors.secondary}}>?????? ????????????????????</div>
                            <form onSubmit={changeNews}>
                                <Input 
                                    placeHolder="test@gmail.com"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    className='edit-profile-input'
                                    type={"text"}
                                    style={{textAlign:"left",marginBottom:"20px"}}
                                />
                                <Button
                                    className="green-btn submit-btn"
                                    htmlType='submit'
                                >
                                    ?????? ???????? ??????????
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