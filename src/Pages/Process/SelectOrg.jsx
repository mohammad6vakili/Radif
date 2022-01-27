import React,{useState,useEffect} from 'react';
import "./SelectOrg.css";
import { useHistory } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import {setBrand} from "../../Store/Action";
import {Button,Modal} from 'antd';
import { toast } from 'react-toastify';
import axios from 'axios';
import Env from "../../Constant/Env.json";
import Colors from "../../Helper/Colors";
import loadingSvg from "../../Assets/Animations/loading.svg";
import backBtn from "../../Assets/Images/back-btn.svg";
import notifIcon from "../../Assets/Images/notification.svg";
import favorIcon from "../../Assets/Images/favor-icon.svg";
import bankLogo from "../../Assets/Images/bank-logo.svg";
import plusIcon from "../../Assets/Images/plus.svg";
import plusGrayIcon from "../../Assets/Images/plus-gray.svg";
import checkIcon from "../../Assets/Images/check.svg";



const SelectOrg=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const org=useSelector(state=>state.Reducer.org);
    const [tab , setTab]=useState(0);
    const [addModal , setAddModal]=useState(false);
    const [brands , setBrands]=useState(null);
    const [favList , setFavList]=useState(null);


    const getBrandList=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/organization/brand-list/",
                {
                    organization_id:org
                }
                ,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            console.log(response.data.ContentData);
            setBrands(response.data.ContentData);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const getFavList=async()=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.get(Env.baseUrl + "/organization/user-favorite-brand-list/",
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            console.log(response.data.results);
            setFavList(response.data.ContentData);
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const addToFavList=async(id)=>{
        const token = localStorage.getItem("token");
        try{
            const response = await axios.post(Env.baseUrl + "/organization/add-favorite-brand/",
            {
                ob_id:id
            },
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setAddModal(false);
            getFavList();
            getBrandList();
            toast.success("با موفقیت به مورد علاقه ها اضافه شد",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const removeFromFavList=async(id)=>{
        const token = localStorage.getItem("token");
        let newId;
        favList.map((fav)=>{
            if(fav.brand_id===id){
                newId = fav.id
            }
        })
        try{
            const response = await axios.delete(Env.baseUrl + `/organization/user-favorite-brand/${newId}/`,
                {
                    headers:{
                        "Authorization":"Token "+ token
                    }
                }
            );
            setAddModal(false);
            getFavList();
            getBrandList();
            toast.success("با موفقیت حذف شد",{
                position: toast.POSITION.BOTTOM_LEFT
            });
        }catch({err , response}){
            if(response && response.status===401){
                localStorage.clear();
                history.push("/login");
                toast.error("شما از برنامه خارج شده اید",{
                    position:"bottom-left"
                });
            }else{
                toast.error(response && response.data.detail,{
                    position:"bottom-left"
                });
            }
        }
    }

    const selectBrand=(data)=>{
        dispatch(setBrand(data));
        history.push("/dashboard/process/fill");
    }

    useEffect(()=>{
        getBrandList();
        getFavList();
    },[])

    useEffect(()=>{
        if(brands && favList){
            brands.map((brand)=>{
                favList.map((fav)=>{
                    if(brand.id===fav.brand_id){
                        brand.fav=true;
                    }else if(brand.id===fav.brand_id){
                        brand.fav=false;
                    }
                })
            })
        }
    })

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
                    {brands && brands.map((data,index)=>(
                        <div key={index} className='select-org-modal-list-item'>
                            <img src={data.logo} alt="bank" />
                            <span style={{marginRight:"10px",color:Colors.secondary,fontSize:"13px"}}>{data.name}</span>
                            <div>
                                {
                                    data.fav===true ? 
                                        <img onClick={()=>removeFromFavList(data.id)} src={checkIcon} alt="checked" />
                                    :
                                        <img onClick={()=>addToFavList(data.id)} src={plusGrayIcon} alt="add" />
                                }
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
                {favList && favList.map((data)=>(
                    <div onClick={()=>{
                        dispatch(setBrand({id:data.brand_id,name:data.brand_name,logo:data.logo}));
                        history.push("/dashboard/process/fill");
                    }}>
                        <div>
                            <img src={data.logo} alt="org" />
                        </div>
                        <span>{data.brand_name}</span>
                    </div>
                ))}
                {brands && 
                    <div onClick={()=>setAddModal(true)}>
                        <div>
                            <img src={plusIcon} alt="add" />
                        </div>
                        <span style={{color:Colors.green}}>افزودن</span>
                    </div>
                }
            </div>
            {brands &&
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
            }
            <div className='select-org-org-list'>
                {brands && tab===0 &&  brands.map((data)=>(
                    <div 
                        key={data.id}
                        onClick={()=>selectBrand(data)}
                    >
                        <div>
                            <img src={data.logo} alt="org logo" />
                        </div>
                        <span>{data.name}</span>
                    </div>
                ))}
                {tab===1 &&  brands.map((data)=>(
                    data.type==="بانک دولتی" &&
                    <div 
                        key={data.id}
                        onClick={()=>selectBrand(data)}
                    >
                        <div>
                            <img src={data.logo} alt="org logo" />
                        </div>
                        <span>{data.name}</span>
                    </div>
                ))}
                {tab===2 &&  brands.map((data)=>(
                    data.type==="بانک خصوصی" &&
                    <div 
                        key={data.id}
                        onClick={()=>selectBrand(data)}
                    >
                        <div>
                            <img src={data.logo} alt="org logo" />
                        </div>
                        <span>{data.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SelectOrg;