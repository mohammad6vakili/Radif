import React,{useState} from 'react';
import "./SearchResult.css";
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { setResult , setSaf} from '../../Store/Action';
import { Button , Slider , Rate } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'jalali-moment';
import Env from "../../Constant/Env.json";
import FormatHelper from '../../Helper/FormatHelper';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";
import distanceIcon from "../../Assets/Images/distance.svg";



const SearchResult=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const [tab , setTab]=useState(0);

    const lat= useSelector(state=>state.Reducer.lat);
    const lng = useSelector(state=>state.Reducer.lng);
    const locName = useSelector(state=>state.Reducer.locName);
    const turnDate = useSelector(state=>state.Reducer.turnDate);
    const service = useSelector(state=>state.Reducer.service);
    const brand = useSelector(state=>state.Reducer.brand);
    const serviceName = useSelector(state=>state.Reducer.serviceName);
    const result = useSelector(state=>state.Reducer.result);

    const marks = {
        0: '۰',
        33: '۵ کیلومتر',
        66: '۱۰ کیلومتر',
        100: '۱۵'
    };
    const array=[1,2,3,4,5];

    const searchTurn=async(val)=>{
        let distance = val * 100;
        const token = localStorage.getItem("token");
        let datee = turnDate.year+"/"+turnDate.month+"/"+turnDate.day;
        try{
            const response = await axios.post(Env.baseUrl + "/rqueue/turn-service-list/",
                {
                    service_id:service,
                    organization_brand_id:brand.id,
                    date: moment.from(FormatHelper.toEnglishString(datee.replace("/","-").replace("/","-")), 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
                    lat:lat,
                    long:lng,
                    priority:1,
                    meter:parseInt(distance.toFixed(0))
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            if(response.data.ContentData.length===0){
                toast.warning("متاسفانه صفی در این محدوده مکانی و زمانی پیدا نشد!",{
                    position:"bottom-left"
                })
            }else{
                history.push("/dashboard/process/result");
                dispatch(setResult(response.data.ContentData));
            }
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                console.log(response , err);
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    return(
        <div className='dashboard-page search-result'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/process/fill")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={homeIcon} alt="home"/>
                </div>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={brand && Env.imageBaseUrl + brand.logo} alt="bank" />
                </div>
                <span>{serviceName} در {brand && brand.name}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={calendarIcon} alt="calendar" />
                </div>
                <span>{turnDate && FormatHelper.toPersianString(turnDate.year+"/"+turnDate.month+"/"+turnDate.day)}</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <div>
                    <img src={locationIcon} alt="location" />
                </div>
                <span>{locName}</span>
            </div>
            <div className='search-result-tab-btn'>
                <Button
                    style={{borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    بر اساس سریعترین نوبت
                </Button>
                <Button
                    style={{borderRadius:"1000px 0 0 1000px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    بر اساس نزدیکترین مکان
                </Button>
            </div>
            {tab===0 &&
                <div className='search-result-range'>
                    <span style={{color:Colors.bigGray}}>انتخاب بازه فاصله مکانی</span>
                    <Slider 
                        tooltipVisible={false}
                        marks={marks} 
                        defaultValue={100} 
                        reverse={true}
                        onChange={(value)=>searchTurn(value/600)}
                    />
                </div>
            }
            <div style={{width:"100%",marginTop:"20px"}}>
                {result && result.length>0 && result.map((data,index)=>(
                    <div
                        key={index}
                        onClick={()=>{
                            dispatch(setSaf(data));
                            history.push("/dashboard/process/selected-result");
                        }} 
                        className='search-result-item'
                    >
                        <span>{data.brand_name} {data.branch_name} - {FormatHelper.toPersianString(data.branch_code)}</span>
                        <div className='search-result-item-distance'>
                            <div>
                                <img src={distanceIcon} alt="distance" />
                                {/* <span style={{color:Colors.bigGray,marginRight:"5px",fontSize:"11px"}}>۲.۸ کیلومتر</span> */}
                            </div> 
                            <Rate 
                                disabled
                                style={{direction:"ltr",marginRight:"auto"}}  
                                defaultValue={data.branch_score===null ? 0 : data.branch_score} 
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchResult;