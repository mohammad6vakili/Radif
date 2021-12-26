import React,{useState} from 'react';
import "./SelectOrg.css";
import { useHistory } from 'react-router-dom';
import {Button,Modal} from 'antd';
import { toast } from 'react-toastify';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import favorIcon from "../../Assets/Images/favor-icon.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import plusIcon from "../../Assets/Images/plus.svg";
import plusGrayIcon from "../../Assets/Images/plus-gray.svg";
import checkIcon from "../../Assets/Images/check.svg";



const SelectOrg=()=>{
    const history=useHistory();
    const [tab , setTab]=useState(0);
    const [addModal , setAddModal]=useState(false);
    const array=[1,2,3,4,5,6,7,8,9];
    const lessArray=[1,2,3];

    const addToFav=()=>{
        setAddModal(false);
        toast.success("با موفقیت به مورد علاقه ها اضافه شد",{
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    return(
        <div className='select-org dashboard-page'>
            <Modal 
                visible={addModal}
                closable={false}
                onOk={()=>setAddModal(false)}
                wrapClassName="calendar-wrape-modal"
                className='calendar-modal'
                onCancel={()=>setAddModal(false)}
                style={{width:"100%",background:"white",display:"flex",justifyContent:"center",padding:"5px",maxWidth:"420px"}}
                footer={[]}
            >
                <div style={{margin:"10px 0",color:"#64748B",textAlign:"center"}}>افزودن به علاقه مندی ها</div>
                <div className='select-org-modal-list'>
                    {array.map((data)=>(
                        <div className='select-org-modal-list-item'>
                            <img src={bankLogo} alt="bank" />
                            <span style={{marginRight:"10px",color:Colors.secondary,fontSize:"13px"}}>بانک شهر</span>
                            <div onClick={addToFav}>
                                <img src={plusGrayIcon} alt="add" />
                                {/* <img src={checkIcon} alt="checked" /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div style={{width:"100%",display:"flex",alignItems:"center"}}>
                <img src={favorIcon} alt="favorate" />
                <span style={{color:"#64748B",marginRight:"7px"}}>بانک های مورد علاقه</span>
            </div>
            <div className='select-org-fav-list'>
                {lessArray.map((data)=>(
                    <div onClick={()=>history.push("/dashboard/process/fill")}>
                        <div>
                            <img src={bankLogo} alt="org" />
                        </div>
                        <span>بانک شهر</span>
                    </div>
                ))}
                <div onClick={()=>setAddModal(true)}>
                    <div>
                        <img src={plusIcon} alt="add" />
                    </div>
                    <span style={{color:Colors.green}}>افزودن</span>
                </div>
            </div>
            <div className='profile-tab-btn profile-tab-btn-tripple' style={{marginTop:"0"}}>
                <Button
                    style={{backgroundColor:"white",padding:"4px",borderRadius:"0 1000px 1000px 0"}}
                    className={tab===0 && "profile-tab-selected"}
                    onClick={()=>setTab(0)}
                >
                    نمایش همه بانک ها
                </Button>
                <Button
                    style={{backgroundColor:"white",padding:"4px"}}
                    className={tab===1 && "profile-tab-selected"}
                    onClick={()=>setTab(1)}
                >
                    بانک های دولتی
                </Button>
                <Button
                    style={{backgroundColor:"white",padding:"4px",borderRadius:"1000px 0 0 1000px"}}
                    className={tab===2 && "profile-tab-selected"}
                    onClick={()=>setTab(2)}
                >
                    بانک های خصوصی
                </Button>
            </div>
            <div className='select-org-org-list'>
                {array.map((data)=>(
                    <div onClick={()=>history.push("/dashboard/process/fill")}>
                        <div>
                            <img src={bankLogo} alt="org" />
                        </div>
                        <span>بانک شهر</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SelectOrg;