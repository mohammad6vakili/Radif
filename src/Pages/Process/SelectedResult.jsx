import React,{useState,useRef} from 'react';
import "./SelectedResult.css";
import { useHistory } from 'react-router-dom';
import { Rate , Button , Modal , Input , Progress} from 'antd';
import FormatHelper from "../../Helper/FormatHelper";
import {Calendar} from "react-modern-calendar-datepicker";
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
    const [tab , setTab]=useState(0);
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const [calModal , setCalModal]=useState(false);
    const [timeModal , setTimeModal]=useState(false);
    const [timeValue , setTimeValue]=useState("");

    const array=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    const comments=[1,2,3,4,5];


    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
    }

    return(
        <div className='dashboard-page selected-result' style={{position:"relative"}}>
            <div className="selected-result-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/result")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/home")}>
                    <img src={homeIcon} alt="home"/>
                </div>
                <div className='selected-result-header-detail'>
                    <div>
                        <img src={bankLogo} alt="bank" />
                    </div>
                    <div>
                        <span style={{color:Colors.secondary}}>شعبه نارمک جنوبی</span>
                        <span style={{color:Colors.bigGray}}>۱۲۳۴۵۶</span>
                        <Rate defaultValue={3} style={{direction:"ltr"}} />
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
                        <span>افتتاح حساب قرض الحسنه در بانک ایران زمین</span>
                    </div>
                    <div>
                        <span>آدرس دقیق</span>
                        <span>تهران , منطقه ۸ , خیابان عباس جعفری , نبش چهارراه تلفنخانه</span>
                    </div>
                    <div>
                        <span>شماره تماس</span>
                        <span>۰۲۱-۷۷۲۵ ۷۷۲۵</span>
                        <span>۰۲۱-۷۷۲۵ ۷۷۲۵</span>
                    </div>
                    <div>
                        <span>تاریخ مراجعه</span>
                        <span>چهارشنبه - ۱۴۰۰/۰۴/۲۵</span>
                        <Button 
                            onClick={()=>setCalModal(true)}
                        >
                            <img src={editIcon} alt="edit" />
                        </Button>
                    </div>
                    <div style={{marginBottom:"60px"}}>
                        <img src={clockIcon} style={{position:"absolute",left:"5px",top:"10px"}} alt="time" />
                        <Input
                            onFocus={()=>{setTimeModal(true);submitRef.current.focus();}}
                            className='edit-profile-input'
                            value={timeValue}
                            placeholder='انتخاب ساعت مراجعه'
                        />
                    </div>
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
                            {array.map((data)=>(
                                <div onClick={()=>{setTimeModal(false);setTimeValue(data);}}>{data}</div>
                            ))}
                        </div>
                    </Modal>
                </div>
            }
            {tab===1 &&
                <div className='selected-result-tab-one'>
                    <div className='selected-result-tab-one-steps'>
                        <div>
                            <div>۱</div>
                            <span>اصل کارت ملی و شناسنامه</span>
                        </div>
                        <div>
                            <div>۲</div>
                            <span>اصل کارت ملی و شناسنامه</span>
                        </div>
                        <div>
                            <div>۳</div>
                            <span>اصل کارت ملی و شناسنامه</span>
                        </div>
                        <div>
                            <div>۴</div>
                            <span>اصل کارت ملی و شناسنامه</span>
                        </div>
                        <div>
                            <div>۵</div>
                            <span>اصل کارت ملی و شناسنامه</span>
                        </div>
                    </div>
                    <div style={{marginBottom:"30px"}}>
                        <span style={{color:Colors.bigGray,fontSize:"12px"}}>فایل های قابل دانلود</span>
                        <div className='selected-result-tab-one-file'>
                            <img src={pdfImage} alt="file type" />
                            <span style={{fontSize:"12px",marginRight:"10px"}}>فرم مشخصات فردی</span>
                            <img style={{marginRight:"auto"}} src={downloadImage} alt="download" />
                        </div>
                        <div className='selected-result-tab-one-file'>
                            <img src={pdfImage} alt="file type" />
                            <span style={{fontSize:"12px",marginRight:"10px"}}>فرم مشخصات فردی</span>
                            <img style={{marginRight:"auto"}} src={downloadImage} alt="download" />
                        </div>
                    </div>
                </div>
            }
            {tab===2 &&
                <div className='selected-result-tab-two'>
                    <div className='selected-result-tab-two-rate'>
                        <div>
                            <span style={{fontSize:"24px",fontWeight:"700"}}>۴.۵</span>
                            <span style={{fontSize:"12px",color:Colors.bigGray}}>۲۴ نظر</span>
                        </div>
                        <div className='selected-result-tab-two-progress'>
                            <div>
                                <span>۱</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={10} />
                            </div>
                            <div>
                                <span>۲</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={50} />
                            </div>
                            <div>
                                <span>۳</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={80} />
                            </div>
                            <div>
                                <span>۴</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={35} />
                            </div>
                            <div>
                                <span>۵</span>
                                <img src={grayStar} alt="rate" />
                                <Progress trailColor='#D9DBE9' strokeColor="#4E4B66" showInfo={false} percent={100} />
                            </div>
                        </div>
                    </div>
                    <div className='selected-result-tab-two-comments'>
                        {comments.map((data)=>(
                            <div className='selected-result-tab-two-comment'>
                                <div>
                                    <div>
                                        <img src={grayAvatar} alt="avatar" />
                                        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",marginRight:"7px"}}>
                                            <span style={{color:Colors.bigGray,fontSize:"12px"}}>عباس جعفری</span>
                                            <span style={{color:Colors.bigGray,opacity:".5",fontSize:"10px"}}>۱۴۰۰/۰۳/۲۵</span>
                                        </div>
                                    </div>
                                    <Rate defaultValue={3} style={{direction:"ltr"}} />
                                </div>
                                <div>
                                    سرویس دهی بسیار عالی و اینکه دقیقا سر نوبت رسیدم و بسیار خوب بود.ممنون از برنامه خوب صف.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className='bottom-btn-box'>
                <Button
                    className="green-btn submit-btn"
                    // onClick={()=>history.push("/dashboard/process/result")}
                    ref={submitRef}
                >
                    ثبت نوبت
                </Button>
            </div>
        </div>
    )
}
export default SelectedResult;