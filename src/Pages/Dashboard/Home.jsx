import React,{useState,useEffect} from 'react';
import "./Home.css";
import Colors from "../../Helper/Colors";
import hamIcon from "../../Assets/Images/ham-icon.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {setTurnData , setHamburger, setOrg} from "../../Store/Action";
import loadingSvg from "../../Assets/Animations/loading.svg";
import bankBanner from "../../Assets/Images/bank-banner.svg";
import policeBanner from "../../Assets/Images/police+10-banner.svg";
import pishkhanBanner from "../../Assets/Images/pishkhan-banner.svg";
import leftArrowGreen from "../../Assets/Images/left-arrow-green.svg";
import leftArrow from "../../Assets/Images/left-arrow.svg";
import Env from "../../Constant/Env.json";
import axios from 'axios';
import moment from 'jalali-moment';
import FormatHelper from '../../Helper/FormatHelper';
import { toast } from 'react-toastify';


const Home=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const [orgs , setOrgs]=useState(null);
    const [turn , setTurn]=useState(null);

    const selectOrg=(id)=>{
        dispatch(setOrg(id));
        history.push("/dashboard/process/select");
    }

    const viewTurn=(data)=>{
        history.push("/dashboard/turn/view");
        dispatch(setTurnData(data));
    }

    const getOrgList=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get(Env.baseUrl + "/organization/list",{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
            console.log(response.data.ContentData);
            setOrgs(response.data.ContentData);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
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

    const getUserTurn=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/rqueue/user-turn-list/",
            {
                count:5
            },{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
            console.log(response.data.ContentData);
            setTurn(response.data.ContentData);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
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

    useEffect(()=>{
        getOrgList();
        getUserTurn();
    },[])

    return(
        <div className="home dashboard-page">
            <div className="dashboard-page-header" style={{zIndex:"unset"}}>
                <div onClick={()=>dispatch(setHamburger(true))}>
                    <img src={hamIcon} alt="menu"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            {orgs ? orgs.map((data)=>{
                if(data.name==="بانک"){
                    return <img
                            key={data.id}
                            onClick={()=>selectOrg(data.id)}
                            style={{width:"100%",cursor:"pointer"}}
                            src={bankBanner}
                            alt="banks" 
                        />
                }else if(data.name==="پست"){
                    return <img
                            key={data.id}
                            onClick={()=>selectOrg(data.id)}
                            style={{width:"100%",cursor:"pointer"}}
                            src={pishkhanBanner}
                            alt="banks" 
                        />
                }
            })
            :
                <div className='loading-wrapper'>
                    <img src={loadingSvg} alt="loading" />
                </div>
            }
            <div className="home-turn-title">
                <span style={{color:"gray"}}>نوبت های من</span>
                <span onClick={()=>history.push("/dashboard/myProcess")} style={{color:Colors.green,fontWeight:"900",cursor:"pointer"}}>مشاهده همه نوبت های من <img src={leftArrowGreen} alt="left arrow" /></span>
            </div>
            <div className="home-turn-list">
                {turn && turn.length>0 &&
                    turn.map((data,index)=>(
                        <div onClick={()=>viewTurn(data)} key={index}>
                            <img src={data.logo} alt="logo" />
                            <div>
                                <span style={{fontWeight:"700"}}>{data.brand_name}  - {data.branch_name}</span>
                                <span style={{fontSize:"11px",color:Colors.secondary}}>{data.branch_address && data.branch_address}</span>
                                <span>{data.date!=="" && data.date!==null ? FormatHelper.toPersianString(moment(data.date.toString()).locale('fa').format('YYYY/M/DD')) : "---"} - {FormatHelper.toPersianString(data.time)}</span>
                            </div>
                            <img src={leftArrow} alt="left arrow" />
                        </div>
                    ))
                }
                {turn===null && 
                    <div className='loading-wrapper'>
                        <img src={loadingSvg} alt="loading" />
                    </div>
                }
                {turn && turn.length===0 &&
                    <div style={{boxShadow:"none",justifyContent:"center",color:"gray"}}>شما در حال حاضر نوبتی ندارید.</div>
                }
            </div>
        </div>
    )
}
export default Home;