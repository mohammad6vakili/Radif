import React from 'react';
import "./Home.css";
import Colors from "../../Helper/Colors";
import hamIcon from "../../Assets/Images/ham-icon.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {setHamburger} from "../../Store/Action";
import bankBanner from "../../Assets/Images/bank-banner.svg";
import policeBanner from "../../Assets/Images/police+10-banner.svg";
import pishkhanBanner from "../../Assets/Images/pishkhan-banner.svg";
import leftArrowGreen from "../../Assets/Images/left-arrow-green.svg";
import bankLogo from "../../Assets/Images/bank-logo.png";
import leftArrow from "../../Assets/Images/left-arrow.svg";


const Home=()=>{
    const history=useHistory();
    const dispatch=useDispatch();

    return(
        <div className="home dashboard-page">
            <div className="dashboard-page-header" style={{zIndex:"unset"}}>
                <div onClick={()=>dispatch(setHamburger(true))}>
                    <img src={hamIcon} alt="menu"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <img 
                onClick={()=>history.push("/dashboard/process/select")}
                style={{width:"100%",cursor:"pointer"}}
                src={bankBanner}
                alt="banks" 
            />
            <img 
                style={{width:"100%",cursor:"pointer"}}
                src={policeBanner}
                alt="banks" 
            />
            <img 
                style={{width:"100%",cursor:"pointer"}}
                src={pishkhanBanner}
                alt="banks" 
            />
            <div className="home-turn-title">
                <span style={{color:"gray"}}>نوبت های من</span>
                <span style={{color:Colors.green,fontWeight:"900",cursor:"pointer"}}>مشاهده همه نوبت های من <img src={leftArrowGreen} alt="left arrow" /></span>
            </div>
            <div className="home-turn-list">
                <div>
                    <img src={bankLogo} alt="bank" />
                    <div>
                        <span style={{fontWeight:"700"}}>بانک شهر - شعبه ۱۳۵۹ نارمک</span>
                        <span style={{fontSize:"11px",color:Colors.secondary}}>میدان ۹۷ نارمک , نبش خیابان عباس جعفری</span>
                        <span>۱۴۰۰/۰۲/۳۱ - ۱۳:۴۰</span>
                    </div>
                    <img src={leftArrow} alt="left arrow" />
                </div>
                <div>
                    <img src={bankLogo} alt="bank" />
                    <div>
                        <span style={{fontWeight:"700"}}>بانک شهر - شعبه ۱۳۵۹ نارمک</span>
                        <span style={{fontSize:"11px",color:Colors.secondary}}>میدان ۹۷ نارمک , نبش خیابان عباس جعفری</span>
                        <span>۱۴۰۰/۰۲/۳۱ - ۱۳:۴۰</span>
                    </div>
                    <img src={leftArrow} alt="left arrow" />
                </div>
                <div>
                    <img src={bankLogo} alt="bank" />
                    <div>
                        <span style={{fontWeight:"700"}}>بانک شهر - شعبه ۱۳۵۹ نارمک</span>
                        <span style={{fontSize:"11px",color:Colors.secondary}}>میدان ۹۷ نارمک , نبش خیابان عباس جعفری</span>
                        <span>۱۴۰۰/۰۲/۳۱ - ۱۳:۴۰</span>
                    </div>
                    <img src={leftArrow} alt="left arrow" />
                </div>
                <div>
                    <img src={bankLogo} alt="bank" />
                    <div>
                        <span style={{fontWeight:"700"}}>بانک شهر - شعبه ۱۳۵۹ نارمک</span>
                        <span style={{fontSize:"11px",color:Colors.secondary}}>میدان ۹۷ نارمک , نبش خیابان عباس جعفری</span>
                        <span>۱۴۰۰/۰۲/۳۱ - ۱۳:۴۰</span>
                    </div>
                    <img src={leftArrow} alt="left arrow" />
                </div>
                <div>
                    <img src={bankLogo} alt="bank" />
                    <div>
                        <span style={{fontWeight:"700"}}>بانک شهر - شعبه ۱۳۵۹ نارمک</span>
                        <span style={{fontSize:"11px",color:Colors.secondary}}>میدان ۹۷ نارمک , نبش خیابان عباس جعفری</span>
                        <span>۱۴۰۰/۰۲/۳۱ - ۱۳:۴۰</span>
                    </div>
                    <img src={leftArrow} alt="left arrow" />
                </div>
            </div>
        </div>
    )
}
export default Home;