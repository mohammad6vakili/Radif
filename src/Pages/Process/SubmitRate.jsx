import React,{useState} from 'react';
import "./SubmitRate.css";
import hamIcon from "../../Assets/Images/ham-icon.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import { useHistory } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import {setHamburger} from "../../Store/Action";
import Colors from "../../Helper/Colors";
import {Button,Rate,Input} from "antd";
import FormatHelper from "../../Helper/FormatHelper";
import axios from 'axios';
import { toast } from 'react-toastify';
import Env from "../../Constant/Env.json";
const {TextArea}=Input;


const SubmitRate=()=>{

    const history = useHistory();
    const dispatch = useDispatch();

    const brand = useSelector(state=>state.Reducer.brand);
    const saf = useSelector(state=>state.Reducer.saf);

    const [loading , setLoading]=useState(false);
    const [rate , setRate]=useState("0");
    const [desc , setDesc]=useState("");

    const sendRate=async()=>{
        const token = localStorage.getItem("token");
        try{
            setLoading(true);
            const response = await axios.post(Env.baseUrl + "/organization/branch-new-comment/",
                {
                    obb_id:brand.id,
                    score:rate,
                    content:desc
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setLoading(false);
            toast.success("نظر شما با موفقیت ثبت گردید",{
                position:"bottom-left"
            })
            history.push("/dashboard/myProcess");
            console.log(response.data);
        }catch({err , response}){
            setLoading(false);
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
            <div style={{width:"100%",textAlign:"right"}}>
                <span style={{color:Colors.secondary}}>ثبت بازخورد</span>
            </div>
            <div className='submit-rate'>
                <div>
                    <div>
                        <img src={brand && brand.logo} alt="bank" />
                    </div>
                    <div>
                        <span style={{color:Colors.secondary,fontWeight:"600"}}>{saf && saf.branch_name}</span>
                        <span style={{color:Colors.bigGray,fontSize:"14px"}}>{saf && FormatHelper.toPersianString(saf.branch_code)}</span>
                    </div>
                </div>
                <div style={{width:"100%",justifyContent:"flex-start",color:"#334155"}}>
                    به طور کلی به این مرکز چه امتیازی میدهید؟
                </div>
                <Rate
                    style={{marginTop:"20px",fontSize:"32px",direction:"ltr"}}
                    onChange={(val)=>setRate(val)} 
                />
                <div style={{width:"100%",justifyContent:"flex-start",color:"#334155",marginTop:"15px"}}>
                    شما میتوانید تجربه خود را برای سایر کاربران ثبت کنید.
                </div>
                <TextArea
                    style={{
                        borderRadius:"10px",
                        background:"#F8FAFC",
                        border:"1px solid #94A3B8",
                        marginTop:"10px",
                        height:"15vh"
                    }}
                    value={desc}
                    onChange={(e)=>setDesc(e.target.value)}
                    maxLength={400}
                />
            </div>
            <div className='bottom-btn-box'>
                <Button
                    disabled={loading===true || desc.length===0 || rate==="0"}
                    style={loading===true || desc.length===0 || rate==="0" ? {opacity:".5"}:{opacity:"1"}}
                    onClick={sendRate}
                    className="green-btn submit-btn"
                    htmlType='submit'
                >
                    ثبت بازخورد
                </Button>
            </div>
        </div>
    )
}
export default SubmitRate;