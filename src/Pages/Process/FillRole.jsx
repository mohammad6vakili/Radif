import React,{useState,useRef} from 'react';
import "./FillRole.css";
import { useHistory } from 'react-router-dom';
import { Input , Radio , Button , Modal} from 'antd';
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import { useSelector , useDispatch } from 'react-redux';
import { setOther } from '../../Store/Action';
import { toast } from 'react-toastify';
import {Calendar , utils} from "@hassanmojab/react-modern-calendar-datepicker";
import FormatHelper from '../../Helper/FormatHelper';


const FillRole=()=>{

    const history=useHistory();
    const dispatch=useDispatch();

    const [firstName , setFirstName]=useState("");
    const [lastName , setLastName]=useState("");
    const [nationalCode , setNationalCode]=useState("");
    const [mobile , setMobile]=useState("");
    const [phone , setPhone]=useState("");
    const [gender , setGender]=useState("");
    const [email , setEmail]=useState("");
    
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const submitRef = useRef();
    const [calModal , setCalModal]=useState(false);

    const goToSelectRole=()=>{
        if(firstName===""){
            toast.warning("لطفا نام را وارد کنید",{
                position:"bottom-left"
            })
        }else if(lastName===""){
            toast.warning("لطفا نام خانوادگی را وارد کنید",{
                position:"bottom-left"
            })
        }else if(nationalCode===""){
            toast.warning("لطفا کد ملی را وارد کنید",{
                position:"bottom-left"
            })
        }else if(nationalCode.length!==10){
            toast.warning("کد ملی باید 10 رقم باشد",{
                position:"bottom-left"
            })
        }else if(mobile===""){
            toast.warning("لطفا شماره همراه را وارد کنید",{
                position:"bottom-left"
            })
        }else if(mobile.length!==11){
            toast.warning("شماره همراه باید 11 رقم باشد",{
                position:"bottom-left"
            })
        }else{
            dispatch(setOther({
                first_name:firstName,
                last_name:lastName,
                national_code:nationalCode,
                mobile:mobile,
                phone:phone,
                gender:gender,
                date:date,
                email:email
            }));
            history.push("/dashboard/process/select-role");
        }
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
                    <div>
                        <span>نام <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            value={firstName}
                            onChange={(e)=>setFirstName(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div>
                        <span>نام خانوادگی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div>
                        <span>کدملی <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            type={"tel"}
                            value={nationalCode}
                            onChange={(e)=>setNationalCode(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div>
                        <span>شماره همراه <span style={{color:"red",fontWeight:"700"}}>*</span></span>
                        <Input
                            type={"tel"}
                            value={mobile}
                            onChange={(e)=>setMobile(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div>
                        <span>شماره ثابت</span>
                        <Input
                            type="tel"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            className='edit-profile-input'
                        />
                    </div>
                    <div style={{flexDirection:"row",justifyContent:"space-between"}}>
                        <span>جنسیت</span>
                        <Radio.Group 
                            value={gender}
                            onChange={(e)=>setGender(e.target.value)}
                        >
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
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
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
                        maximumDate={utils('fa').getToday()}
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