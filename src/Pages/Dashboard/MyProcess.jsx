import React from 'react';
import "./MyProcess.css";
import { useHistory } from 'react-router-dom';
import {Popover} from 'antd';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import settingImage from "../../Assets/Images/setting-button.svg";
import yellowLabel from "../../Assets/Images/yellow-label.svg";
import greenLabel from "../../Assets/Images/green-label.svg";
import redLabel from "../../Assets/Images/red-label.svg";
import detailIcon from "../../Assets/Images/detail-icon.svg";
import editIcon from "../../Assets/Images/edit-icon.svg";
import deleteIcon from "../../Assets/Images/delete-icon.svg";


const MyProcess=()=>{

    const history=useHistory();
    const array=[1,2,3,4,5,6];

    const content = (
        <div className='my-procces-context-menu'>
          {/* <div>
            <img src={detailIcon} alt="details" />
            <span>جزئیات</span>
          </div> */}
          <div style={{borderBottom:"1px solid #CBD5E1"}}>
            <img src={editIcon} alt="edit" />
            <span>ویرایش</span>
          </div>
          <div>
            <img src={deleteIcon} alt="delete" />
            <span>لغو نوبت</span>
          </div>
        </div>
      );

    return(
        <div className='my-process dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='my-process-list'>
                {array.map((data)=>(
                    <div className="my-process-item">
                    <Popover placement="rightTop" content={content} trigger="click">
                        <img className='my-process-item-setting-button' src={settingImage} alt="setting" />
                    </Popover>
                    <div className='my-process-item-setting-label'>
                        <img src={yellowLabel} alt="label" />
                        <span>در حال انتظار</span>
                    </div>
                    <div className='my-process-item-logo'>
                        <div className='sub-top'></div>
                        <div className='sub-bottom'></div>
                        <img src={bankLogo} alt="bank" />
                        <span style={{fontSize:"12px"}}>بانک</span>
                        <span style={{fontWeight:"700"}}>ایران زمین</span>
                    </div>
                    <div className='my-process-item-details'>
                        <div>افتتاح حساب قرض الحسنه در بانک شهر</div>
                        <div>شعبه نارمک جنوبی - ۱۲۳۴۵</div>
                        <div>چهارشنبه - ۱۴۰۰/۰۴/۲۵</div>
                        <div>ساعت ۱۲</div>
                        <div>کد رهگیری : <span style={{fontWeight:"700"}}>۲۷۸۳۹۳۰</span></div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}
export default MyProcess;