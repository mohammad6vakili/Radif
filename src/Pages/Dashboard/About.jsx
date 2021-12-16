import React from 'react';
import "./About.css";
import { useHistory } from 'react-router-dom';
import Colors from "../../Helper/Colors";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import aboutVector from "../../Assets/Images/about-vector.svg";


const About=()=>{

    const history=useHistory();

    return(
        <div className='about dashboard-page'>
            <div className="dashboard-page-header">
                <div onClick={()=>history.push("/dashboard/home")}>
                    <img src={backBtn} alt="back"/>
                </div>
                <div onClick={()=>history.push("/dashboard/messages")}>
                    <img src={notifIcon} alt="notifs"/>
                    <span></span>
                </div>
            </div>
            <div style={{width:"100%",textAlign:"right"}}>
                <span style={{color:Colors.secondary}}>درباره ما</span>
            </div>
            <div style={{width:"100%",marginTop:"10px",fontSize:"12px",lineHeight:"1.8",textAlign:"justify",color:Colors.secondary}}>
                هموطنان عزیز ، 
                <br />
                امروزه ، بسیاری از شما بزرگواران برای انجام برخی از امور روزانه ی خود نیازمند حضور در صف هستید.
                در بسیاری از این موارد صف های طولانی شکل می گیرد و باعث ایجاد مشکلات عدیده ای برای شما عزیزان می شود.
                شرکت مدیریت هوشمند صف با بکارگیری به روزترین دانش هوش مصنوعی توسط یک تیم مجرب بین المللی بر آن است 
                با ارایه این محصول نرم افزاری برای تلفن همراه ، گامی بلند در راستای ارتقای کیفی و کمی خدمات ارایه شده 
                توسط مراکز دولتی ، خصولتی و خصوصی بردارد به گونه ای که رضایتمندی شما گرامیان را به همراه داشته باشد . 
                علاوه بر این ، اجرای موفق این طرح ،موجب کاهش چشم گیری در اتلاف وقت شهروندان ، ترافیک شهری ، آلودگی های صوتی و 
                زیست محیطی خواهد شد . همچنین ، بهره وری کارمندان و محیط کار نیز افزایش می یابد . در نهایت ، با کاهش حضور مردم 
                در صف های طولانی انتظار می رود یکی از عوامل مهم زنجیره ای بیماری های ویروسی همچون کرونا ، کاهش قابل توجهی پیدا کند و 
                باعث ارتقا سلامت مردم شریف ایران شود .
            </div>
            <img style={{marginTop:"auto"}} src={aboutVector} alt="about" />
        </div>
    )
}
export default About;