import React from 'react';
import "./SelectedResult.css";
import { useHistory } from 'react-router-dom';
import { Rate } from 'antd';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import homeIcon from "../../Assets/Images/home.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";


const SelectedResult=()=>{

    const history=useHistory();

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

            selected result
        </div>
    )
}
export default SelectedResult;