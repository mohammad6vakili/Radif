import React,{useState , useRef} from 'react';
import "./FillData.css";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Colors from "../../Helper/Colors";
import FormatHelper from '../../Helper/FormatHelper';
import { Select , Modal , Input , Button} from 'antd';
import {Calendar} from "react-modern-calendar-datepicker";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import calendarIcon from "../../Assets/Images/calandar.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import locationIcon from "../../Assets/Images/location.svg";
const {Option}=Select;


const FillData=()=>{

    const history=useHistory();
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const [calModal , setCalModal]=useState(false);
    const submitRef = useRef();
    const locName=useSelector(state=>state.Reducer.locName);

    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
    }

    return(
        <div className='dashboard-page fill-data'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/process/select")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={homeIcon} alt="home"/>
                </div>
            </div>
            <div className='fill-data-page-title'>
                <img src={bankLogo} alt="bank" />
                <span>درخواست نوبت از بانک ایران زمین</span>
            </div>
                <div>
                    <Select
                        ref={submitRef}
                        showSearch
                        allowClear
                        className='filldata-input'
                        style={{width:"100%",backgroundColor:"transparent"}}
                        placeholder="انتخاب خدمت مورد نظر"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        <Option value="1">خدمت شماره 1</Option>
                        <Option value="2">خدمت شماره 2</Option>
                        <Option value="3">خدمت شماره 3</Option>
                        <Option value="4">خدمت شماره 4</Option>
                        <Option value="5">خدمت شماره 5</Option>
                        <Option value="6">خدمت شماره 6</Option>
                    </Select>
                </div>
                <div style={{position:"relative"}}>
                    <img 
                        src={calendarIcon} 
                        alt="calendar" 
                        style={{position:"absolute",left:"5px",width:"20px",top:"25%",zIndex:"99"}} 
                    />
                    <Input
                        onFocus={()=>{setCalModal(true);submitRef.current.focus();}}
                        placeholder='تاریخ تولد خود را وارد کنید'
                        value={date}
                        className='edit-profile-input fill-data-input'
                    />
                </div>
                <div style={{position:"relative"}}>
                    <img 
                        src={locationIcon} 
                        alt="location"
                        style={{position:"absolute",left:"5px",width:"20px",top:"25%",zIndex:"99"}} 
                    />
                    <Input
                        onFocus={()=>history.push("/dashboard/process/map")}
                        placeholder='انتخاب محدوده مکانی'
                        value={locName}
                        className='edit-profile-input fill-data-input'
                    />
                </div>
                <div className='bottom-btn-box'>
                    <Button
                        className="green-btn submit-btn"
                        onClick={()=>history.push("/dashboard/process/result")}
                        ref={submitRef}
                    >
                        جستجو
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
export default FillData;