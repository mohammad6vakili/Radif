import React from 'react';
import "./Dashboard.css";
import { Modal} from 'antd';
import { Switch , Route} from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import userAvatar from "../../Assets/Images/user-avatar.png";
import { setHamburger, setNotif } from '../../Store/Action';
import Colors from "../../Helper/Colors";
import hamTopBg from "../../Assets/Images/ham-top-bg.svg";
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



const Dashboard=()=>{
    const dispatch=useDispatch();
    const hamburger = useSelector(state=>state.Reducer.hamburger);
    const notif = useSelector(state=>state.Reducer.notif);

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
                        <div>
                            <img src={iconTwo} alt="menu" />
                            <span>کیف پول</span>
                            <span className="hamburger-links-badge">(۱۲۰,۰۰۰ ریال موجودی)</span>
                        </div>
                        <div>
                            <img src={iconThree} alt="menu" />
                            <span>پیام ها</span>
                            <div></div>
                            <span className="hamburger-links-badge">(۲ پیام جدید)</span>
                        </div>
                        <div>
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
                        <div>
                            <img src={iconSeven} alt="menu" />
                            <span>درباره ما</span>
                        </div>
                        <div>
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
            <Modal
                closable={false}
                visible={notif}
                onCancel={()=>dispatch(setNotif(false))}
                style={{top:0}}
                className="notif-modal"
                footer={[]}
            >
                <div style={{textAlign:"center",fontSize:"18px",padding:"4px 0",color:Colors.black}}>اعلانات</div>
                <div className="notif-body">
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                    <div>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها</div>
                </div>
            </Modal>
            <Switch>
                <Route path="/dashboard/home" component={Home} />
            </Switch>
        </div>
    )
}
export default Dashboard;