import React,{useState,useRef} from 'react';
import "./FillRole.css";
import { useHistory } from 'react-router-dom';
import { Input , Radio , Button , Modal} from 'antd';
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import { toast } from 'react-toastify';
import {Calendar , utils} from "react-modern-calendar-datepicker";
import FormatHelper from '../../Helper/FormatHelper';


const FillRole=()=>{
    
    const history=useHistory();
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const submitRef = useRef();
    const [calModal , setCalModal]=useState(false);

    const goToSelectRole=()=>{
        history.push("/dashboard/process/select-role")
    }


    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
    }

    return(
        <div className='dashboard-page payment'>
            <div style={{justifyContent:"flex-start"}} className="dashboard-page-header">
                <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/process/select-role")}>
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <div style={{width:"100%",textAlign:"center",paddingBottom:"15px",fontSize:"16px",borderBottom:"1px solid #dadada6c"}}>
                ورود اطلاعات نوبت گیرنده
            </div>
            <div className='profile-infos'>
                    <div style={{opacity:".6"}}>
                        <span>نام <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>نام خانوادگی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>کدملی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{opacity:".6"}}>
                        <span>شماره همراه <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input 
                            className='edit-profile-input'
                        />
                    </div>
                    <div>
                        <span>شماره ثابت</span>
                        <Input
                            type="tel"
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <span>جنسیت</span>
                        <Radio.Group>
                            <Radio value={"مرد"}>مرد</Radio>
                            <Radio value={"زن"}>زن</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <span>تاریخ تولد</span>
                            <Input 
                                onFocus={()=>{setCalModal(true);submitRef.current.focus();}}
                                placeholder='تاریخ تولد خود را وارد کنید'
                                value={date}
                                className='edit-profile-input'
                            />
                    </div>
                    <div>
                        <span>آدرس ایمیل</span>
                        <Input 
                            className='edit-profile-input'
                            type="email"
                        />
                    </div>
                </div>
                <div className='bottom-btn-box'>
                    <Button
                        className="green-btn submit-btn"
                        onClick={goToSelectRole}
                        ref={submitRef}
                    >
                        تایید
                    </Button>
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
                        minimumDate={utils('fa').getToday()}
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
        </div>
        )
}    
export default FillRole;