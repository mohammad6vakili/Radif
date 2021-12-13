import React from 'react';
import "./Transactions.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import calendarImage from "../../Assets/Images/calandar.svg";
import creditCardImage from "../../Assets/Images/creditcard.svg";


const Transactions=()=>{
    
    const history=useHistory();

    return(
        <div className='transactions dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div className='trans-item-wrapper'>
                <div className='trans-inc'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-dec'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-inc'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-dec'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-inc'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-dec'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-inc'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-dec'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
                <div className='trans-inc'>
                    <div style={{textAlign:"right",fontSize:"12px",color:Colors.secondary}}>کارمزد دریافت سیم کارت</div>
                    <div style={{textAlign:"center",fontSize:"28px",fontWeight:"700"}}>۱۴۰,۰۰۰ <span style={{fontSize:"12px"}}>ریال</span></div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <div>
                            <img src={calendarImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>یکشنبه - ۱۴۰۰/۰۲/۱۹  <span style={{fontSize:"10px",marginRight:"5px"}}>۱۲:۳۳</span></span>
                        </div>
                        <div>
                            <img src={creditCardImage} alt="calendar"/>
                            <span style={{fontSize:"12px",color:Colors.secondary}}>۳۷۶۸۳۷۹۸۴</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transactions;