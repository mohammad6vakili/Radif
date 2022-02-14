import React,{useState,useEffect} from 'react';
import "./MyProcess.css";
import { useHistory } from 'react-router-dom';
import {Popover} from 'antd';
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import settingImage from "../../Assets/Images/setting-button.svg";
import yellowLabel from "../../Assets/Images/yellow-label.svg";
import greenLabel from "../../Assets/Images/green-label.svg";
import redLabel from "../../Assets/Images/red-label.svg";
import detailIcon from "../../Assets/Images/detail-icon.svg";
import editIcon from "../../Assets/Images/edit-icon.svg";
import deleteIcon from "../../Assets/Images/delete-icon.svg";
import loadingSvg from "../../Assets/Animations/loading.svg";
import FormatHelper from '../../Helper/FormatHelper';
import moment from 'jalali-moment';
import { setTurnData } from '../../Store/Action';



const MyProcess=()=>{

    const dispatch=useDispatch();
    const history=useHistory();


    const [turn , setTurn]=useState(null);

    const cancelTurn=async(turn)=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/rqueue/cancellation-turn/",
            {
                turn_id:turn.id,
                is_other:false
            },{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
            console.log(response.data);
            if(response.data.Header.Status===400){
                toast.warning("نوبت منقضی شده است",{
                    position:"bottom-left"
                })
            }else{
                toast.success("نوبت با موفقیت لغو شد",{
                    position:"bottom-left"
                })
            }
            getUserTurn();
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
                count:10
            },{
                headers:{
                    "Authorization":"Token "+ token
                }
            })
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
        getUserTurn();
    },[])

    return(
        <div className='my-process dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='my-process-list'>
                {turn===null && 
                    <div className='loading-wrapper'>
                        <img src={loadingSvg} alt="loading" />
                    </div>
                }
                {turn && turn.length===0 && <div style={{textAlign:"center",width:"100%"}}>در حال حاضر نوبتی ندارید.</div>}
                {turn && turn.length>0 && turn.map((data,index)=>(
                    <div key={index} className="my-process-item">
                        <Popover placement="rightTop" content={()=>(
                            <div className='my-procces-context-menu'>
                                <div onClick={()=>{dispatch(setTurnData(data));history.push("/dashboard/turn/view")}} style={{borderBottom:"1px solid #CBD5E1"}}>
                                    <img src={detailIcon} alt="edit" />
                                    <span>جزییات</span>
                                </div>
                                <div style={{borderBottom:"1px solid #CBD5E1"}}>
                                    <img src={editIcon} alt="edit" />
                                    <span>ویرایش</span>
                                </div>
                                <div onClick={()=>cancelTurn(data)}>
                                    <img src={deleteIcon} alt="delete" />
                                    <span>لغو نوبت</span>
                                </div>
                            </div>
                        )} trigger="click">
                            <img className='my-process-item-setting-button' src={settingImage} alt="setting" />
                        </Popover>
                        {data.presence_status==="Absent" &&
                            <div className='my-process-item-setting-label'>
                                <img src={redLabel} alt="label" />
                                <span>عدم حضور</span>
                            </div>
                        }
                        {data.presence_status==="Present" &&
                            <div className='my-process-item-setting-label'>
                                <img src={greenLabel} alt="label" />
                                <span>حضور</span>
                            </div>
                        }
                        {data.presence_status==="Pending" &&
                            <div className='my-process-item-setting-label'>
                                <img src={yellowLabel} alt="label" />
                                <span>در حال انتظار</span>
                            </div>
                        }
                        <div className='my-process-item-logo'>
                            <div className='sub-top'></div>
                            <div className='sub-bottom'></div>
                            <img src={data.logo} alt="logo" />
                            <span style={{fontWeight:"700"}}>{data.brand_name}</span>
                        </div>
                        <div className='my-process-item-details'>
                            <div>{data.service_name} در {data.brand_name}</div>
                            <div>{data.branch_name} - {FormatHelper.toPersianString(data.branch_code)}</div>
                            <div>{data.date!=="" && data.date!==null ? FormatHelper.toPersianString(moment(data.date.toString()).locale('fa').format('YYYY/M/DD')) : "---"}</div>
                            <div>ساعت {data.time && FormatHelper.toPersianString(data.time)}</div>
                            <div>کد رهگیری : <span style={{fontWeight:"700"}}>{FormatHelper.toPersianString(data.track_code)}</span></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MyProcess;