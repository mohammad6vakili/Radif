import React,{useState,useRef,useEffect} from 'react';
import "./SelectedResult.css";
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import {setSelectedTurn} from "../../Store/Action";
import { Rate , Button , Modal , Input , Progress} from 'antd';
import FormatHelper from "../../Helper/FormatHelper";
import moment from 'jalali-moment';
import {Calendar,utils} from "@hassanmojab/react-modern-calendar-datepicker";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import editIcon from "../../Assets/Images/edit-icon.svg";
import clockIcon from "../../Assets/Images/clock-icon.svg";
import pdfImage from "../../Assets/Images/pdf.png";
import downloadImage from "../../Assets/Images/download.svg";
import grayStar from "../../Assets/Images/gray-star.svg";
import grayAvatar from "../../Assets/Images/gray-avatar.svg";


const SelectedResult=()=>{
    const submitRef=useRef();
    const history=useHistory();
    const dispatch=useDispatch();

    const saf = useSelector(state=>state.Reducer.saf);
    const locName = useSelector(state=>state.Reducer.locName);
    const turnDate = useSelector(state=>state.Reducer.turnDate);
    const service = useSelector(state=>state.Reducer.service);
    const brand = useSelector(state=>state.Reducer.brand);
    const serviceName = useSelector(state=>state.Reducer.serviceName);
    const result = useSelector(state=>state.Reducer.result);
    const selectedTurn = useSelector(state=>state.Reducer.selectedTurn);

    const [tab , setTab]=useState(0);
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(turnDate);
    const [calModal , setCalModal]=useState(false);
    const [timeModal , setTimeModal]=useState(false);
    const [reqList , setReqList]=useState(null);
    const [fileList , setFileList]=useState(null);
    const [comments , setComments]=useState(null);



    const getReqList=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/service/service-requirement-list/",
                {
                    service_id:service,
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setReqList(response.data.ContentData.requirements[0].contents);
            setFileList(response.data.ContentData.files);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                console.log(err , response);
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const getBranchComment=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + `/organization/branch-comment-list/`,{
                obb_id:saf.brand_id
            },
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setComments(response.data.ContentData);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                console.log(err , response);
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    useEffect(()=>{
        if(calDate){
            setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        }
        getReqList();
        getBranchComment();
    },[calDate])

    return(
        <div className='dashboard-page selected-result' style={{position:"relative"}}>
            <div onClick={()=>console.log(fileList , reqList)} className="selected-result-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/result")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/home")}>
                    <img src={homeIcon} alt="home"/>
                </div>
                <div className='selected-result-header-detail'>
                    <div>
                        <img src={brand && Env.imageBaseUrl + brand.logo} alt="bank" />
                    </div>
                    <div>
                        <span style={{color:Colors.secondary}}>{saf && saf.branch_name}</span>
                        <span style={{color:Colors.bigGray}}>{saf && FormatHelper.toPersianString(saf.branch_code)}</span>
                        {saf && saf.branch_score &&
                            <Rate defaultValue={saf.branch_score} style={{direction:"ltr"}} />
                        }
                    </div>
                </div>
            </div>
            <div className='profile-tab-btn profile-tab-btn-tripple' style={{marginTop:"0"}}>
                <Button
                    style={{padding:"4px",borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    جزییات
                </Button>
                <Button
                    style={{padding:"4px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    مدارک لازم
                </Button>
                <Button
                    style={{padding:"4px",borderRadius:"1000px 0 0 1000px"}}
                    className={tab===2 && "profile-tab-selected"}
                    onClick={()=>setTab(2)}
                >
                    نظرات
                </Button>
            </div>
            {tab===0 &&
                <div className='selected-result-tab'>
                    <div>
                        <span>خدمت انتخاب شده</span>
                        <span>{serviceName} در {brand && brand.name}</span>
                    </div>
                    <div>
                        <span>آدرس دقیق</span>
                        <span>{saf && saf.branch_address}</span>
                    </div>
                    <div>
                        <span>شماره تماس</span>
                        <span>{saf && FormatHelper.toPersianString(saf.branch_phone)}</span>
                    </div>
                    <div>
                        <span>تاریخ مراجعه</span>
                        <span>{saf && saf.date && date}</span>
                    </div>
                    <div style={{marginBottom:"60px"}}>
                        <img src={clockIcon} style={{position:"absolute",left:"5px",top:"10px"}} alt="time" />
                        <Input
                            onFocus={()=>{setTimeModal(true);submitRef.current.focus();}}
                            className='edit-profile-input'
                            value={selectedTurn && FormatHelper.toPersianString(selectedTurn.time)}
                            placeholder='انتخاب ساعت مراجعه'
                        />
                    </div>
                    <Modal 
                        visible={timeModal}
                        closable={false}
                        onOk={()=>setTimeModal(false)}
                        wrapClassName="calendar-wrape-modal"
                        className='calendar-modal'
                        onCancel={()=>setTimeModal(false)}
                        bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                        style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                        footer={[]}
                    >
                        <div className='select-time-modal-body'>
                            {saf && saf.turns.map((data,index)=>(
                                <div
                                    style={data.status!=="free" ? {opacity:".4"} : {opacity:"1"}}
                                    key={index}
                                    onClick={()=>{
                                        if(data.status!=="free"){
                                            toast.warning("نوبت انتخاب شده قبلا رزرو شده است",{
                                                position:"bottom-left"
                                            });
                                        }else{
                                            dispatch(setSelectedTurn(data));
                                            setTimeModal(false);
                                        }
                                    }}
                                >
                                    {FormatHelper.toPersianString(data.time)}
                                </div>
                            ))}
                        </div>
                    </Modal>
                </div>
            }
            {tab===1 &&
                <div className='selected-result-tab-one'>
                    <div className='selected-result-tab-one-steps'>
                        {reqList && reqList.length>0 && reqList.map((data , index)=>(
                            <div key={index}>
                                <div>{FormatHelper.toPersianString(index + 1)}</div>
                                <span>{data.content}</span>
                            </div>    
                        ))}
                    </div>
                    <div style={{marginBottom:"30px"}}>
                        <span style={{color:Colors.bigGray,fontSize:"12px"}}>فایل های قابل دانلود</span>
                        {fileList && fileList.length>0 && fileList.map((file,index)=>(
                            <a 
                                target={'_blank'}
                                href={"https://learnwithexample.com" + file.file} 
                                className='selected-result-tab-one-file'
                            >
                                <img src={pdfImage} alt="file type" />
                                <span style={{fontSize:"12px",marginRight:"10px"}}>فرم مشخصات فردی</span>
                                <img style={{marginRight:"auto"}} src={downloadImage} alt="download" />
                            </a>
                        ))}
                    </div>
                </div>
            }
            {tab===2 && comments &&
                <div className='selected-result-tab-two'>
                    <div className='selected-result-tab-two-rate'>
                        <div>
                            <span style={{fontSize:"24px",fontWeight:"700"}}>
                                {FormatHelper.toPersianString(comments.avg_score.toFixed(0))}
                            </span>
                            <span style={{fontSize:"12px",color:Colors.bigGray}}>
                                {FormatHelper.toPersianString(comments.total_count)} نظر
                            </span>
                        </div>
                        <div className='selected-result-tab-two-progress'>
                            <div>
                                <span>۱</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={comments.score_1 * 20} />
                            </div>
                            <div>
                                <span>۲</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={comments.score_2 * 20} />
                            </div>
                            <div>
                                <span>۳</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={comments.score_3 * 20} />
                            </div>
                            <div>
                                <span>۴</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={comments.score_4 * 20} />
                            </div>
                            <div>
                                <span>۵</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={comments.score_5 * 20} />
                            </div>
                        </div>
                    </div>
                    <div className='selected-result-tab-two-comments'>
                        {comments.comments.map((data,index)=>(
                            <div key={index} className='selected-result-tab-two-comment'>
                                <div>
                                    <div>
                                        <img src={grayAvatar} alt="avatar" />
                                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",marginRight:"7px"}}>
                                            <span style={{color:Colors.bigGray,fontSize:"12px"}}>
                                                {data.first_name} {data.last_name}
                                            </span>
                                            <span style={{color:Colors.bigGray,opacity:".5",fontSize:"10px"}}>
                                                {FormatHelper.toPersianString(moment(data.date.toString()).locale('fa').format('YYYY/M/DD'))}
                                            </span>
                                        </div>
                                    </div>
                                    <Rate 
                                        defaultValue={data.score===null || data.score==="" ? 0 : data.score} 
                                        style={{direction:"ltr"}} 
                                    />
                                </div>
                                <div className='comment-text-wrap'>
                                    {data.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className='bottom-btn-box'>
                <Button
                    className="green-btn submit-btn"
                    onClick={()=>{
                        if(selectedTurn===null){
                            toast.warning("لطفا ساعت مراجعه را انتخاب کنید",{
                                position:"bottom-left"
                            })
                        }else{
                            history.push("/dashboard/process/select-role");
                        }
                    }}
                    ref={submitRef}
                >
                    ثبت نوبت
                </Button>
            </div>
        </div>
    )
}
export default SelectedResult;