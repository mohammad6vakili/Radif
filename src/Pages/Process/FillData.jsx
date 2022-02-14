import React,{useState , useEffect , useRef} from 'react';
import "./FillData.css";
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import {
    setService,
    setLat,
    setLng,
    setTurnDate,
    setResult,
    setServiceName,
    setDate
} from '../../Store/Action';
import Colors from "../../Helper/Colors";
import FormatHelper from '../../Helper/FormatHelper';
import { Select , Modal , Input , Button} from 'antd';
import moment from 'jalali-moment'
import {Calendar,utils} from "react-modern-calendar-datepicker";
import axios from 'axios';
import Env from "../../Constant/Env.json";
import { toast } from 'react-toastify';
import loadingLine from "../../Assets/Animations/loading.svg";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import calendarIcon from "../../Assets/Images/calandar.svg";
import locationIcon from "../../Assets/Images/location.svg";
const {Option}=Select;


const FillData=()=>{
    
    const history=useHistory();
    const dispatch=useDispatch();
    const [calModal , setCalModal]=useState(false);
    const [loading , setLoading]=useState(false);
    const [services , setServices]=useState(null);
    const submitRef = useRef();

    const locName=useSelector(state=>state.Reducer.locName);
    const brand=useSelector(state=>state.Reducer.brand);
    const service=useSelector(state=>state.Reducer.service);
    const turnDate=useSelector(state=>state.Reducer.turnDate);
    const lat=useSelector(state=>state.Reducer.lat);
    const lng=useSelector(state=>state.Reducer.lng);
    const date=useSelector(state=>state.Reducer.date);


    const selectDateSubmit=()=>{
        dispatch(setDate(FormatHelper.toPersianString(turnDate.year+"/"+turnDate.month+"/"+turnDate.day)));
        setCalModal(false);
        submitRef.current.focus();
    }

    const selectService=(value)=>{
        services.map((data)=>{
            if(data.id===value){
                dispatch(setServiceName(data.name));
            }
        })
        dispatch(setService(value));
    }

    const getBrandServices=async()=>{
        const token = localStorage.getItem("token");
        try{
            setLoading(true);
            const response = await axios.post(Env.baseUrl + "/organization/brand-service-list/",
                {
                    organization_brand_id:brand.id
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
                toast.error(response && response.data.detail,{
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
                    toast.error("برای استفاده از نقشه نیاز به دسترسی موقعیت مکانی میباشد.",{
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


    const searchTurn=async()=>{
        const token = localStorage.getItem("token");
        if(service===null){
            toast.warning("لطفا سرویس مورد نظر خود را انتخاب کنید",{
                position:"bottom-left"
            });
        }else if(lat===null || lng===null){
            toast.warning("لطفا موقعیت مکانی خود را انتخاب کنید",{
                position:"bottom-left"
            });
        }else if(date===null){
            toast.warning("لطفا تاریخ مورد خود را انتخاب کنید",{
                position:"bottom-left"
            });
        }else{
            try{
                setLoading(true);
                const response = await axios.post(Env.baseUrl + "/rqueue/turn-service-list/",
                    {
                        service_id:service,
                        organization_brand_id:brand.id,
                        date: moment.from(FormatHelper.toEnglishString(date.replace("/","-").replace("/","-")), 'fa', 'YYYY/MM/DD').format('YYYY-MM-DD'),
                        lat:lat,
                        long:lng,
                        priority:1,
                        meter:15
                    }
                    ,
                    {
                        headers:{
                            "Authorization":"Token "+ token
                        }
                    }
                );
                setLoading(false);
                if(response.data.ContentData.length===0){
                    toast.warning("متاسفانه صفی در این محدوده مکانی و زمانی پیدا نشد!",{
                        position:"bottom-left"
                    })
                }else{
                    history.push("/dashboard/process/result");
                    dispatch(setResult(response.data.ContentData));
                }
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
    }


    useEffect(()=>{
        if(brand){
            getBrandServices();
        }
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
            {brand && 
                <div className='fill-data-page-title'>
                    <img src={brand.logo} alt="logo" />
                    <span>درخواست نوبت از {brand.name}</span>
                </div>
            }
                <div>
                    <Select
                        ref={submitRef}
                        disabled={loading}
                        showSearch
                        allowClear
                        value={service}
                        onChange={(value)=>selectService(value)}
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
                        src={locationIcon} 
                        alt="location"
                        style={{position:"absolute",left:"5px",width:"20px",top:"25%",zIndex:"999"}} 
                    />
                    <Input
                        onFocus={openMapPage}
                        placeholder='انتخاب محدوده مکانی'
                        value={locName}
                        style={{paddingLeft:"35px",textOverflow:"ellipsis",direction:"rtl"}}
                        className='edit-profile-input fill-data-input'
                    />
                </div>
                <div style={{position:"relative"}}>
                    <img 
                        src={calendarIcon} 
                        alt="calendar" 
                        style={{position:"absolute",left:"5px",width:"20px",top:"25%",zIndex:"99"}} 
                    />
                    <Input
                        onFocus={()=>{setCalModal(true);submitRef.current.focus();}}
                        placeholder='انتخاب تاریخ'
                        value={date}
                        className='edit-profile-input fill-data-input'
                    />
                </div>
                <div className='bottom-btn-box'>
                    {loading ?
                        <img style={{width:"60px"}} src={loadingLine} alt="loading" />
                    :
                        <Button
                            loading={loading}
                            className="green-btn submit-btn"
                            onClick={searchTurn}
                            disabled={loading}
                        >
                            جستجو
                        </Button>
                    }
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
                        value={turnDate}
                        onChange={(val)=>dispatch(setTurnDate(val))}
                        minimumDate={utils('fa').getToday()}
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