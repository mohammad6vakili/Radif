import React from 'react';
import "./Dashboard.css";
import { Modal} from 'antd';
import { Switch , Route} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import userAvatar from "../../Assets/Images/user-avatar.png";
import {setHamburger} from '../../Store/Action';
import {useHistory} from 'react-router-dom';
import Colors from "../../Helper/Colors";
import iconOne from "../../Assets/Images/ham-icon-one.svg";
import iconTwo from "../../Assets/Images/ham-icon-two.svg";
import iconThree from "../../Assets/Images/ham-icon-three.svg";
import iconFour from "../../Assets/Images/ham-icon-four.svg";
import iconFive from "../../Assets/Images/ham-icon-five.svg";
import iconSix from "../../Assets/Images/ham-icon-six.svg";
import iconSeven from "../../Assets/Images/ham-icon-seven.svg";
import iconEight from "../../Assets/Images/ham-icon-eight.svg";
import iconNine from "../../Assets/Images/ham-icon-nine.svg";
import Home from "../../Pages/Dashboard/Home";
import Messages from '../../Pages/Global/Messages';
import Message from '../../Pages/Global/Message';
import Profile from '../../Pages/Dashboard/Profile';
import EditProfile from "../../Pages/Dashboard/EditProfile";
import Wallet from '../../Pages/Dashboard/Wallet';
import Transactions from '../../Pages/Dashboard/Transactions';
import About from '../../Pages/Dashboard/About';



const Dashboard=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const hamburger = useSelector(state=>state.Reducer.hamburger);

    return(
        <div className="dashboard">
            <Modal
                closable={false}
                visible={hamburger}
                onCancel={()=>dispatch(setHamburger(false))}
                style={{top:0}}
                className="hamburger-modal"
                footer={[]}
            >
                <div className="hamburger-body">
                    <div className="hamburger-header">
                        <img src={userAvatar} alt="user avatar" />
                        <div>
                            <span style={{fontWeight:"700"}}>محمدعلی وکیلی دوست</span>
                            <span style={{color:Colors.black,fontSize:"12px"}}>حساب کاربری</span>
                        </div>
                    </div>
                    <div className="hamburger-links">
                        <div>
                            <img src={iconOne} alt="menu" />
                            <span>نوبت های من</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/wallet");dispatch(setHamburger(false))}}>
                            <img src={iconTwo} alt="menu" />
                            <span>کیف پول</span>
                            <span className="hamburger-links-badge">(۱۲۰,۰۰۰ ریال موجودی)</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/messages");dispatch(setHamburger(false))}}>
                            <img src={iconThree} alt="menu" />
                            <span>پیام ها</span>
                            <div></div>
                            <span className="hamburger-links-badge">(۲ پیام جدید)</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/transactions");dispatch(setHamburger(false))}}>
                            <img src={iconFour} alt="menu" />
                            <span>لیست پرداخت ها</span>
                        </div>
                        <div>
                            <img src={iconFive} alt="menu" />
                            <span>پشتیبانی</span>
                        </div>
                        <div>
                            <img src={iconSix} alt="menu" />
                            <span>دریافت هدیه</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/about");dispatch(setHamburger(false))}}>
                            <img src={iconSeven} alt="menu" />
                            <span>درباره ما</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/profile");dispatch(setHamburger(false))}}>
                            <img src={iconEight} alt="menu" />
                            <span>تنظیمات</span>
                        </div>
                        <div>
                            <img src={iconNine} alt="menu" />
                            <span>خروج از حساب کاربری</span>
                        </div>
                    </div>
                </div>
            </Modal>
            <Switch>
                <Route path="/dashboard/home" component={Home} />
                <Route path="/dashboard/messages" exact component={Messages} />
                <Route path="/dashboard/messages/message" component={Message} />
                <Route path="/dashboard/profile" exact component={Profile} />
                <Route path="/dashboard/profile/edit" component={EditProfile} />
                <Route path="/dashboard/wallet" component={Wallet} />
                <Route path="/dashboard/transactions" component={Transactions} />
                <Route path="/dashboard/about" component={About} />
            </Switch>
        </div>
    )
}
export default Dashboard;