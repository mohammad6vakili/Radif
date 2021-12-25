import React,{useState} from 'react';
import "./SearchResult.css";
import { useHistory } from 'react-router-dom';
import { Button , Slider , Rate } from 'antd';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";
import distanceIcon from "../../Assets/Images/distance.svg";



const SearchResult=()=>{

    const history=useHistory();
    const [tab , setTab]=useState(0);

    const marks = {
        0: '۰',
        33: '۵ کیلومتر',
        66: '۱۰ کیلومتر',
        100: '۱۵'
    };
    const array=[1,2,3,4,5];

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
                    <img src={bankLogo} alt="bank" />
                </div>
                <span>افتتاح حساب قرض الحسنه در بانک ایران زمین</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <img src={lineVector} alt="line" />
                <div>
                    <img src={calendarIcon} alt="calendar" />
                </div>
                <span>چهارشنبه - ۱۴۰۰/۰۲/۲۵</span>
            </div>
            <div style={{color:Colors.secondary}} className='search-result-step'>
                <div>
                    <img src={locationIcon} alt="location" />
                </div>
                <span>نارمک - میدان چهل و سوم</span>
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
                        defaultValue={30} 
                        reverse={true}
                    />
                </div>
            }
            <div style={{width:"100%",marginTop:"20px"}}>
                {array.map((data)=>(
                    <div onClick={()=>history.push("/dashboard/process/selected-result")} className='search-result-item'>
                        <span>بانک ایران زمین شعبه نارمک جنوبی - ۲۳۸۹</span>
                        <div className='search-result-item-distance'>
                            <div>
                                <img src={distanceIcon} alt="distance" />
                                <span style={{color:Colors.bigGray,marginRight:"5px",fontSize:"11px"}}>۲.۸ کیلومتر</span>
                            </div>
                            <Rate style={{direction:"ltr",marginRight:"auto"}}  defaultValue={2.5} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SearchResult;