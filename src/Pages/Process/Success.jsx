import React from 'react';
import "./Success.css";
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import successVector from "../../Assets/Images/new-vectors/done.svg";
import Colors from "../../Helper/Colors";
import shareIcon from "../../Assets/Images/share.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import { toast } from 'react-toastify';
import FormatHelper from '../../Helper/FormatHelper';
import moment from 'jalali-moment';


const Success=()=>{

    const history=useHistory();
    const getTurn=useSelector(state=>state.Reducer.getTurn);
    const brand=useSelector(state=>state.Reducer.brand);
    const saf=useSelector(state=>state.Reducer.saf);


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
        <div className='dashboard-page success'>
            <img src={successVector} alt="success" />
            <div style={{width:"100%",textAlign:"center",color:Colors.secondary,margin:"20px 0"}}>
                نوبت شما با موفقیت ثبت شد
            </div>
            <div className="my-process-item" style={{height:"20vh"}}>
                <div className='my-process-item-logo'>
                    <div className='sub-top'></div>
                    <div className='sub-bottom'></div>
                    <img src={bankLogo} alt="bank" />
                    <span style={{fontSize:"12px"}}>بانک</span>
                    <span style={{fontWeight:"700",fontSize:"13px"}}>ایران زمین</span>
                </div>
                <div onClick={()=>console.log(saf)} className='my-process-item-details' style={{fontSize:"11px"}}>
                    <div>{getTurn && getTurn.service_name} در {brand && brand.name}</div>
                    <div>{saf.branch_name} - {FormatHelper.toPersianString(saf.branch_code)}</div>
                    <div>{getTurn && FormatHelper.toPersianString(moment(getTurn.time).locale('fa').format('jYYYY/jM/jD'))}</div>
                    <div>ساعت : {getTurn && FormatHelper.toPersianString(moment(getTurn.time).locale('fa').format('HH:mm'))}</div>
                    <div>کد رهگیری : <span style={{fontWeight:"700",fontSize:"14px"}}>{getTurn && FormatHelper.toPersianString(getTurn.track_code)}</span></div>
                </div>
            </div>
            <div 
                onClick={handleSharing}
                style={{
                    margin:"5px 0 20px 0",
                    cursor:"pointer",
                    display:"flex",
                    justifyContent:"flex-start",
                    alignItems:"center",
                    width:"100%"
                }}
            >
                <img src={shareIcon} alt="share" />
                <span style={{color:Colors.green,marginRight:"7px",fontSize:"12px"}}>اشتراک گذاری صف</span>
            </div>
            <div className='bottom-btn-box'>
                <Button
                    style={{marginLeft:"5px"}}
                    onClick={()=>history.push("/dashboard/myProcess")}
                    className="border-dark-btn submit-btn"
                >
                    نوبت های من
                </Button>
                <Button
                    onClick={()=>history.push("/dashboard/home")}
                    className="green-btn submit-btn"
                >
                    صفحه اصلی
                </Button>
            </div>
        </div>
    )
}
export default Success;