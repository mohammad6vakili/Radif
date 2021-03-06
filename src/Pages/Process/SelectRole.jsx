import React,{useState} from 'react';
import "./SelectRole.css";
import { useSelector , useDispatch} from 'react-redux';
import { setIsOther , setGetTurn} from '../../Store/Action';
import { useHistory } from 'react-router-dom';
import { Radio , Button} from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'jalali-moment';
import FormatHelper from '../../Helper/FormatHelper';
import Env from "../../Constant/Env.json";
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import greenClock from "../../Assets/Images/green-clock.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";



const SelectRole=()=>{

    const history=useHistory();
    const dispatch=useDispatch();
    
    const [loading , setLoading]=useState(false);

    const saf = useSelector(state=>state.Reducer.saf);
    const serviceName = useSelector(state=>state.Reducer.serviceName);
    const selectedTurn = useSelector(state=>state.Reducer.selectedTurn);
    const isOther = useSelector(state=>state.Reducer.isOther);
    const other = useSelector(state=>state.Reducer.other);

    const registerTurn=async()=>{
        const token = localStorage.getItem("token");
        try{
            setLoading(true);
            const response = await axios.post(Env.baseUrl + "/rqueue/register-turn/",
                {
                    turn_id:selectedTurn.id,
                    isOther:isOther==="0" ? false : true,
                    other_info:isOther==="1" ? other : {}
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setLoading(false);
            if(response.data.Header.Status===400){
                toast.warning("???????? ?????????? ?????? ??????",{
                    position:"bottom-left"
                })
            }else{
                toast.success("???????? ???? ???????????? ?????? ????",{
                    position:"bottom-left"
                })
                history.push("/dashboard/process/success");
            }
            dispatch(setGetTurn(response.data.ContentData));
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

    const goNextLevel=()=>{
        if(isOther==="0"){
            registerTurn();
        }else if(isOther==="1" && Object.keys(other).length===0){
            history.push("/dashboard/process/fillrole");
        }else if(isOther==="1" && Object.keys(other).length!==0){
            registerTurn();
        }else{
            toast.warning("???????? ???????? ???????? ???????? ???? ?????? ???????? ?????????? ??????",{
                position:"bottom-left"
            })
        }
    }


    return(
        <div className='dashboard-page select-role'>
            <div onClick={()=>console.log(selectedTurn)} className="dashboard-page-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/selected-result")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div onClick={()=>console.log(saf)}>
                    <img src={saf && Env.imageBaseUrl + saf.brand_logo} alt="bank" />
                </div>
                <span>{serviceName} ???? {saf && saf.brand_name}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={calendarIcon} alt="calendar" />
                </div>
                <span>
                    {selectedTurn && FormatHelper.toPersianString(moment(saf.date.toString()).locale('fa').format('YYYY/M/DD'))}
                    {/* {selectedTurn && moment.from(FormatHelper.toPersianString((saf.date).replace("/","-").replace("/","-"), 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'))} */}
                </span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={locationIcon} alt="location" />
                </div>
                <span>{saf && saf.branch_address}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <div>
                    <img src={greenClock} alt="time" />
                </div>
                <span>{selectedTurn && FormatHelper.toPersianString(selectedTurn.time)}</span>
            </div>
            <div style={{width:"100%",height:"1px",background:"#CBD5E1",margin:"10px 0"}}></div>
            <Radio.Group 
                value={isOther}
                onChange={(e)=>dispatch(setIsOther(e.target.value))}
            >
                <Radio value={"0"}>???????? ???????? ???????? ?????????? ????</Radio>
                <Radio value={"1"}>???????? ?????? ?????????? ???????? ?????????? ????</Radio>
            </Radio.Group>
            {Object.keys(other).length!==0 && isOther==="1" &&
                <div className='other-info'>
                    <div>?????? :  {other.first_name}</div>
                    <div>?????? ???????????????? :  {other.last_name}</div>
                    <div>???? ?????? :  {FormatHelper.toPersianString(other.national_code)}</div>
                    <div>?????????? ?????????? :  {FormatHelper.toPersianString(other.mobile)}</div>
                    <div>?????????? ???????? :  {other.phone && FormatHelper.toPersianString(other.phone)}</div>
                    <div>?????????? :  {other.gender && FormatHelper.toPersianString(other.gender)}</div>
                    <div>?????????? ???????? :  {other.date && FormatHelper.toPersianString(other.date)}</div>
                    <div>?????????? :  {other.email && FormatHelper.toPersianString(other.email)}</div>
                </div>
            }
            <div></div>
            <div className='bottom-btn-box'>
                <Button
                    className="green-btn submit-btn"
                    onClick={goNextLevel}
                >
                    ?????? ????????
                </Button>
            </div>
        </div>
    )
}
export default SelectRole;