import React from 'react';
import "./Message.css";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import topBg from "../../Assets/Images/message-top-bg.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";



const Message=()=>{

    const history=useHistory();

    return(
        <div className='message dashboard-page'>
            <div className="dashboard-page-header">
                <img style={{position:"absolute",zIndex:"-1",width:"120%",right:"-10px"}} src={topBg} alt="bg" />
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div className="message-username">
                    <img src={bankLogo} alt="bank logo" />
                    <div>بانک ایران زمین - شعبه نارون</div>
                </div>
            </div>
            <div className='message-items'>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>

                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
                <div className='message-item'>
                    <span>۱۲:۳۰ - ۱۴۰۰/۰۲/۲۹</span>
                    <div>
                        متاسفانه بخاطر قطعی برق امکان ارائه خدمات وجود ندارد و نمیتوان در محل حضور پیدا کرد پیشاپیش از شما معذرت میخواهیم
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Message;