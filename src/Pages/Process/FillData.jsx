import React,{useState , useEffect , useRef} from 'react';
import "./FillData.css";
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { setService , setLat , setLng, setLocName} from '../../Store/Action';
import Colors from "../../Helper/Colors";
import FormatHelper from '../../Helper/FormatHelper';
import { Select , Modal , Input , Button} from 'antd';
import {Calendar} from "react-modern-calendar-datepicker";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import calendarIcon from "../../Assets/Images/calandar.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import locationIcon from "../../Assets/Images/location.svg";
const {Option}=Select;


const FillData=()=>{
    
    const history=useHistory();
    const dispatch=useDispatch();
    const [date , setDate]=useState(null);
    const [calDate , setCalDate]=useState(null);
    const [calModal , setCalModal]=useState(false);
    const [loading , setLoading]=useState(false);
    const [services , setServices]=useState(null);
    const submitRef = useRef();
    const locName=useSelector(state=>state.Reducer.locName);
    const brand=useSelector(state=>state.Reducer.brand);
    const service=useSelector(state=>state.Reducer.service);
    const lat=useSelector(state=>state.Reducer.lat);
    const lng=useSelector(state=>state.Reducer.lng);

    const searchBranch=()=>{
        if(service===null){
            toast.warning("لطفا سرویس مورد نظر خود را انتخاب کنید",{
                position:"bottom-left"
            });
        }else{
            history.push("/dashboard/process/result");
        }
    }

    const selectDateSubmit=()=>{
        setDate(FormatHelper.toPersianString(calDate.year+"/"+calDate.month+"/"+calDate.day));
        setCalModal(false);
    }


    const getBrandServices=async()=>{
        const token = localStorage.getItem("token");
        try{
            setLoading(true);
            const response = await axios.post(Env.baseUrl + "/organization/brand-service-list/",
                {
                    organization_brand_id:brand
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setLoading(false);
            console.log(response.data.ContentData);
            setServices(response.data.ContentData);
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
                toast.error(response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const openMapPage=()=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setCoord,handler);
            function setCoord(position){
                dispatch(setLat(position.coords.latitude.toFixed(6)));
                dispatch(setLng(position.coords.longitude.toFixed(6)));
                history.push("/dashboard/process/map");
            }
        }
        function handler(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    toast.error("برای استفاده از نرم افزار نیاز به دسترسی موقعیت مکانی میباشد.لطفا خارج شوید و دوباره وارد شوید یا صفحه را رفرش کنید",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                break;
                case error.POSITION_UNAVAILABLE:
                    toast.error("موقعیت جغرافیایی ناشناس میباشد.",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                break;
                case error.TIMEOUT:
                    toast.error("لطفا از برنامه خارج شوید و دوباره امتحان کنید.",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                break;
                case error.UNKNOWN_ERROR:
                    toast.error("یک خطای ناشناس رخ داده !",{
                        position: toast.POSITION.BOTTOM_LEFT
                    });  
                break;
            }
        }
    }

    useEffect(()=>{
        getBrandServices();
    },[])

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
                        disabled={loading}
                        showSearch
                        allowClear
                        onChange={(value)=>dispatch(setService(value))}
                        className='filldata-input'
                        style={{width:"100%",backgroundColor:"transparent"}}
                        placeholder={loading ? "درحال دریافت لیست خدمات" : "انتخاب خدمت مورد نظر"}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                        }
                    >
                        {services && services.map((data)=>(
                            <Option value={data.id} key={data.id}>
                                {data.name}
                            </Option>
                        ))}
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
                        onFocus={openMapPage}
                        placeholder='انتخاب محدوده مکانی'
                        value={locName}
                        className='edit-profile-input fill-data-input'
                    />
                </div>
                <div className='bottom-btn-box'>
                    <Button
                        className="green-btn submit-btn"
                        onClick={searchBranch}
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