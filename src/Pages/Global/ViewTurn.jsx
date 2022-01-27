import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import backBtn from "../../Assets/Images/back-btn.svg";
import Colors from "../../Helper/Colors";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import calendarIcon from "../../Assets/Images/green-calendar.svg";
import locationIcon from "../../Assets/Images/green-location.svg";
import greenClock from "../../Assets/Images/green-clock.svg";
import lineVector from "../../Assets/Images/dotted-line.svg";
import moment from 'jalali-moment';
import FormatHelper from '../../Helper/FormatHelper';


const ViewTurn=()=>{
    const history=useHistory();
    const turn=useSelector(state=>state.Reducer.turn);

    return(
        <div className='dashboard-page select-role'>
            {turn &&
                <>
                <div className="dashboard-page-header">
                    <div className='selected-result-header-btn' onClick={()=>history.push("/dashboard/myProcess")}>
                        <img src={backBtn} alt="back"/>
                    </div>
                </div>
                <div style={{color:Colors.secondary}} className='search-result-step'>
                    <img src={lineVector} alt="line" />
                    <div>
                        <img src={bankLogo} alt="bank" />
                    </div>
                    <span>افتتاح حساب قرض الحسنه در {turn.brand_name} {" "} {turn.branch_name}</span>
                </div>
                <div style={{color:Colors.secondary}} className='search-result-step'>
                    <img src={lineVector} alt="line" />
                    <div>
                        <img src={calendarIcon} alt="calendar" />
                    </div>
                    <span>
                        {turn.date!=="" && turn.date!==null ? FormatHelper.toPersianString(moment(turn.date.toString()).locale('fa').format('YYYY/M/DD')) : "---"}
                    </span>
                </div>
                <div style={{color:Colors.secondary}} className='search-result-step'>
                    <img src={lineVector} alt="line" />
                    <div>
                        <img src={locationIcon} alt="location" />
                    </div>
                    <span>{turn.branch_address}</span>
                </div>
                <div style={{color:Colors.secondary}} className='search-result-step'>
                    <div>
                        <img src={greenClock} alt="time" />
                    </div>
                    <span>{FormatHelper.toPersianString(turn.time)}</span>
                </div>
                </>
            }
        </div>
    )
}
export default ViewTurn;