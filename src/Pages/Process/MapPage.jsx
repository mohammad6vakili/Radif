import React, { useState , useEffect } from 'react';
import "./MapPage.css";
import ReactMapGL,{Marker} from "react-map-gl";
import markerIcon from "../../Assets/Images/location-marker.png";
import { useHistory } from 'react-router-dom';
import { setLat, setLng, setLocName } from '../../Store/Action';
import { useDispatch , useSelector} from 'react-redux';
import {Button,AutoComplete, Input} from 'antd';
import backBtn from "../../Assets/Images/back-btn.svg";
import axios from 'axios';
import { toast } from 'react-toastify';


const MapPage=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const locName=useSelector(state=>state.Reducer.locName);
    const lat=useSelector(state=>state.Reducer.lat);
    const lng=useSelector(state=>state.Reducer.lng);
    const [viewport , setViewport]=useState({
        latitude:parseFloat(lat),
        longitude:parseFloat(lng),
        width:"100%",
        height:"100vh",
        zoom:14,
        transitionDuration: 2000,
    });
    const [showBtn , setShowBtn]=useState(false);
    const [options, setOptions] = useState([]);


    const clickOnMap=(viewport)=>{
        dispatch(setLat(viewport.lngLat[0]));
        dispatch(setLng(viewport.lngLat[1]));
        setShowBtn(true);
    }

    const getAddress=async()=>{
        try{
            const response = await axios.get(`https://api.neshan.org/v2/reverse?lat=${lat}&lng=${lng}`,{
                headers:{
                    "Api-Key":"service.VSr2DXiEJyGt1hbBf9QqW8hzsW6g60VYOCBVuyB1"
                }
            })
            dispatch(setLocName(response.data.formatted_address));
        }catch(err){
            console.log(err);
            toast.error("خطا در برقراری ارتباط",{
                position:"bottom-left"
            });
        }
    }

    const onSelect = (data) => {
        dispatch(setLocName(data));
        setShowBtn(true);
      };

      useEffect(()=>{
        getAddress();
      },[lat])


    return(
        <div className='map-page'>
            <div className="dashboard-page-header map-page-header">
                <div 
                    onClick={()=>history.push("/dashboard/process/fill")}
                >
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            <AutoComplete
                disabled
                value={locName}
                className='map-page-auto-complete'
            />
            <ReactMapGL 
                mapboxApiAccessToken="pk.eyJ1IjoibW9oYW1tYWQtdmFhIiwiYSI6ImNrbDkxdWswcTA1aDYycW9vNm52MWQ1ZW0ifQ.9hKrFV_dAPja2Ch6tfH9Sg" 
                {...viewport}
                onNativeClick={(val)=>{
                    dispatch(setLng(val.lngLat[0]));
                    dispatch(setLat(val.lngLat[1]));
                    setShowBtn(true);
                    console.log(lat , lng);
                }}
                onViewportChange={(viewport)=>setViewport(viewport)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <Marker latitude={parseFloat(lat)} longitude={parseFloat(lng)} offsetLeft={-20} offsetTop={-10}>
                    <img style={{width:"25px",marginTop:"-15px"}} src={markerIcon} alt="marker" />
                </Marker>
            </ReactMapGL>

            {showBtn &&
                <div className='bottom-btn-box map-page-bottom-btn-box'>
                    <Button
                        className="green-btn submit-btn"
                        onClick={()=>history.push("/dashboard/process/fill")}
                    >
                        تایید
                    </Button>
                </div>
            }
        </div>
    )
}
export default MapPage;