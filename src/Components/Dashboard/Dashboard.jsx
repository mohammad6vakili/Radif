import React,{useState} from 'react';
import "./Dashboard.css";
import { Modal , Button} from 'antd';
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
import Gift from '../../Pages/Dashboard/Gift';
import Support from '../../Pages/Dashboard/Support';
import Ticket from '../../Pages/Dashboard/Ticket';
import MyProcess from '../../Pages/Dashboard/MyProcess';
import SelectOrg from '../../Pages/Process/SelectOrg';
import FillData from '../../Pages/Process/FillData';
import MapPage from "../../Pages/Process/MapPage";
import SearchResult from '../../Pages/Process/SearchResult';
import SelectedResult from '../../Pages/Process/SelectedResult';
import SelectRole from '../../Pages/Process/SelectRole';
import Payment from '../../Pages/Process/Payment';
import FillRole from '../../Pages/Process/FillRole';
import Success from '../../Pages/Process/Success';
import ViewTurn from '../../Pages/Global/ViewTurn';
import SubmitRate from '../../Pages/Process/SubmitRate';



const Dashboard=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const hamburger = useSelector(state=>state.Reducer.hamburger);
    const [logModal , setLogModal]=useState(false);
    const profile=useSelector(state=>state.Reducer.profile);

    const logout=()=>{
        history.push("/login");
        localStorage.removeItem("token");
    }

    return(
        <div className="dashboard">
            <Modal 
                visible={logModal}
                closable={false}
                onOk={()=>setLogModal(false)}
                wrapClassName="calendar-wrape-modal"
                className='calendar-modal profile-logout-modal'
                onCancel={()=>setLogModal(false)}
                bodyStyle={{display:"flex",flexDirection:"column",alignItems:"center"}}
                style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                footer={[]}
            >
                <div className='get-mail-modal-body'>
                    <div style={{width:"100%",textAlign:"center",margin:"10px 0 20px 0",fontSize:"12px",color:Colors.secondary}}>
                        ???????? ???????? ???? ???????????? ?????????? ????????????
                    </div>
                    <div className='profile-log-modal-btns'>
                        <Button onClick={()=>setLogModal(false)}>???? ???????? !</Button>
                        <Button onClick={logout} className='green-btn'>???????? ???? ???????? ????????????</Button>
                    </div>
                </div>
            </Modal>
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
                            <span style={{fontWeight:"700"}}>
                                {profile && profile.first_name} {" "} {profile && profile.last_name}
                            </span>
                            <span style={{color:Colors.black,fontSize:"12px"}}>???????? ????????????</span>
                        </div>
                    </div>
                    <div className="hamburger-links">
                        <div onClick={()=>{history.push("/dashboard/myProcess");dispatch(setHamburger(false))}}>
                            <img src={iconOne} alt="menu" />
                            <span>???????? ?????? ????</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/wallet");dispatch(setHamburger(false))}}>
                            <img src={iconTwo} alt="menu" />
                            <span>?????? ??????</span>
                            {/* <span className="hamburger-links-badge">(??????,?????? ???????? ????????????)</span> */}
                        </div>
                        <div onClick={()=>{history.push("/dashboard/messages");dispatch(setHamburger(false))}}>
                            <img src={iconThree} alt="menu" />
                            <span>???????? ????</span>
                            <div></div>
                            {/* <span className="hamburger-links-badge">(?? ???????? ????????)</span> */}
                        </div>
                        <div onClick={()=>{history.push("/dashboard/transactions");dispatch(setHamburger(false))}}>
                            <img src={iconFour} alt="menu" />
                            <span>???????? ???????????? ????</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/support");dispatch(setHamburger(false))}}>
                            <img src={iconFive} alt="menu" />
                            <span>????????????????</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/gift");dispatch(setHamburger(false))}}>
                            <img src={iconSix} alt="menu" />
                            <span>???????????? ????????</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/about");dispatch(setHamburger(false))}}>
                            <img src={iconSeven} alt="menu" />
                            <span>???????????? ????</span>
                        </div>
                        <div onClick={()=>{history.push("/dashboard/profile");dispatch(setHamburger(false))}}>
                            <img src={iconEight} alt="menu" />
                            <span>??????????????</span>
                        </div>
                        <div onClick={()=>{setLogModal(true);dispatch(setHamburger(false))}}>
                            <img src={iconNine} alt="menu" />
                            <span>???????? ???? ???????? ????????????</span>
                        </div>
                    </div>
                </div>
            </Modal>
            <Switch>
                <Route path="/dashboard/home" component={Home} />
                <Route path="/dashboard/turn/view" exact component={ViewTurn} />
                <Route path="/dashboard/messages" exact component={Messages} />
                <Route path="/dashboard/messages/message" component={Message} />
                <Route path="/dashboard/myProcess" component={MyProcess} />
                <Route path="/dashboard/profile" exact component={Profile} />
                <Route path="/dashboard/profile/edit" component={EditProfile} />
                <Route path="/dashboard/wallet" component={Wallet} />
                <Route path="/dashboard/transactions" component={Transactions} />
                <Route path="/dashboard/about" component={About} />
                <Route path="/dashboard/gift" component={Gift} />
                <Route path="/dashboard/support" exact component={Support} />
                <Route path="/dashboard/support/ticket" component={Ticket} />
                <Route path="/dashboard/process/select" component={SelectOrg} />
                <Route path="/dashboard/process/fill" component={FillData} />
                <Route path="/dashboard/process/map" component={MapPage} />
                <Route path="/dashboard/process/result" component={SearchResult} />
                <Route path="/dashboard/process/selected-result" component={SelectedResult} />
                <Route path="/dashboard/process/select-role" component={SelectRole} />
                <Route path="/dashboard/process/payment" component={Payment} />
                <Route path="/dashboard/process/fillrole" component={FillRole} />
                <Route path="/dashboard/process/success" component={Success} />
                <Route path="/dashboard/process/submit-rate" component={SubmitRate} />
            </Switch>
        </div>
    )
}
export default Dashboard;