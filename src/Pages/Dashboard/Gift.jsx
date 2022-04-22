import React from 'react';
import Colors from "../../Helper/Colors";
import { useHistory } from 'react-router-dom';
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import giftVector from "../../Assets/Images/new-vectors/friends.svg";
import shareIcon from "../../Assets/Images/share.svg";
import { toast } from 'react-toastify';


const Gift=()=>{

    const history=useHistory();

    const handleSharing = async () => {
      let shareData = {
        title: 'پیام دعوت',
        text: 'دعوت به اپلیکیشن ردیف',
        url: 'https://panel.radif.app',
      }        
      if (navigator.share) {
          try {
            await navigator
              .share(shareData)
              .then(() =>
                toast.success("با موفقیت به اشتراک گذاشته شد",{
                    position: toast.POSITION.BOTTOM_LEFT
                })
              );
          } catch (error) {
            toast.error("ظاهرا خطایی رخ داده است !",{
                position: toast.POSITION.BOTTOM_LEFT
            })
            console.log(error);
          }
        } else {
          toast.error("اشتراک گذاری در این مرورگر پشتیبانی نمیشود",{
            position: toast.POSITION.BOTTOM_LEFT
        })
        }
      };

    return(
        <div className='gift dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div style={{width:"100%",marginTop:"10px",fontSize:"12px",lineHeight:"1.8",textAlign:"justify",color:Colors.secondary}}>
                کاربر عزیز ، 
                <br />
                از اعتماد شما برای استفاده ی نرم افزار تلفن همراه هوشمند مدیریت صف سپاس گزاریم . 
                شما می توانید با معرفی این سامانه به دوستان و نزدیکان خود ، ما را در امر خدمت رسانی  
                هرچه بهتر یاری نمایید . به پاس قدردانی از لطف شما کاربر گرامی ، به ازای هر کاربر جدید 
                که شما معرفی نمایید و کاربر با موفقیت این نرم افزار تلفن همراه را دانلود و نصب کند ، 
                پنج هزار تومان هدیه به کیف پول الکترونیکی شما اضافه خواهد شد . لطفا لینک اختصاصی زیر را با دوستان خود 
                به اشتراک بزارید : 
            </div>
            <div onClick={handleSharing} style={{margin:"20px 0",cursor:"pointer"}}>
                <img src={shareIcon} alt="share" />
                <span style={{color:Colors.green,marginRight:"7px"}}>دعوت از دوستان</span>
            </div>
            <img style={{marginTop:"auto",height:"52vh"}} src={giftVector} alt="about" />
        </div>
    )
}
export default Gift;