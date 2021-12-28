import React, { useState , useEffect } from 'react';
import "./MapPage.css";
import ReactMapGL,{Marker} from "react-map-gl";
import markerIcon from "../../Assets/Images/location-marker.png";
import { useHistory } from 'react-router-dom';
import { setSelectCoord } from '../../Store/Action';
import { useDispatch , useSelector} from 'react-redux';
import {Button,AutoComplete} from 'antd';
import backBtn from "../../Assets/Images/back-btn.svg";
import axios from 'axios';
import loadingGif from "../../Assets/Animations/loading.gif"; 


const MapPage=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const selectCoord=useSelector(state=>state.Reducer.selectCoord);
    const [loading , setLoading]=useState(false);
    const [userLat , setUserLat]=useState(parseFloat(localStorage.getItem("lat")));
    const [userLong , setUserLong]=useState(parseFloat(localStorage.getItem("long")));
    const [viewport , setViewport]=useState({
        latitude:parseFloat(userLat),
        longitude:parseFloat(userLong),
        width:"100%",
        height:"100vh",
        zoom:15,
        transitionDuration: 3000,
    });
    const [showBtn , setShowBtn]=useState(false);
    const [showMarker , setShowMarker]=useState(true);
    const [options, setOptions] = useState([]);


    const clickOnMap=(viewport)=>{
        console.log(viewport);
        dispatch(setSelectCoord(viewport.features[0].properties.name));
        setUserLat(viewport.lngLat[0]);
        setUserLong(viewport.lngLat[1]);
        setShowBtn(true);
    }

    const onSearch=async(text)=>{
        // /geocoding/v5/{endpoint}/{longitude},{latitude}.json
        if(text.length<2){
            setOptions([]);
        }else if(text.length>2){
            try{
                const response=await axios.get(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?country=ir&access_token=pk.eyJ1IjoibW9oYW1tYWQtdmFhIiwiYSI6ImNrbDkxdWswcTA1aDYycW9vNm52MWQ1ZW0ifQ.9hKrFV_dAPja2Ch6tfH9Sg`
                );
                console.log(response.data.features[0].place_name);
                if(response.data.features[4] && response.data.features[3] && response.data.features[2] && response.data.features[1] && response.data.features[0]){
                    setOptions([
                        {
                            value:response.data.features[0].geometry.coordinates
                            ,
                            label:response.data.features[0].place_name
                        },
                        {
                            value:response.data.features[1].geometry.coordinates
                            ,
                            label:response.data.features[1].place_name
                        },
                        {
                            value:response.data.features[2].geometry.coordinates
                            ,
                            label:response.data.features[2].place_name
                        },
                        {
                            value:response.data.features[3].geometry.coordinates
                            ,
                            label:response.data.features[3].place_name
                        },
                        {
                            value:response.data.features[4].geometry.coordinates
                            ,
                            label:response.data.features[4].place_name
                        }
                    ])
                }else if(response.data.features[3] && response.data.features[2] && response.data.features[1] && response.data.features[0]){
                    setOptions([
                        {
                            value:response.data.features[0].geometry.coordinates
                            ,
                            label:response.data.features[0].place_name
                        },
                        {
                            value:response.data.features[1].geometry.coordinates
                            ,
                            label:response.data.features[1].place_name
                        },
                        {

                            value:response.data.features[2].geometry.coordinates
                            ,
                            label:response.data.features[2].place_name
                        },
                        {
                            value:response.data.features[3].geometry.coordinates
                            ,
                            label:response.data.features[3].place_name
                        }
                    ])
                }else if(response.data.features[2] && response.data.features[1] && response.data.features[0]){
                    setOptions([
                        {
                            value:response.data.features[0].geometry.coordinates
                            ,
                            label:response.data.features[0].place_name
                        },
                        {
                            value:response.data.features[1].geometry.coordinates
                            ,
                            label:response.data.features[1].place_name
                        },
                        {
                            value:response.data.features[2].geometry.coordinates
                            ,
                            label:response.data.features[2].place_name
                        }
                    ])
                }else if(response.data.features[1] && response.data.features[0]){
                    setOptions([
                        {
                            value:response.data.features[0].geometry.coordinates
                            ,
                            label:response.data.features[0].place_name
                        },
                        {
                            value:response.data.features[1].geometry.coordinates
                            ,
                            label:response.data.features[1].place_name
                        }
                    ])
                }else if(response.data.features[0]){
                    setOptions([
                        {
                            value:response.data.features[0].geometry.coordinates
                            ,
                            label:response.data.features[0].place_name
                        }
                    ])
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    const onSelect = (data) => {
        console.log('onSelect', data);
        setOptions([]);
      };


    return(
        <div className='map-page'>
            <div className="dashboard-page-header map-page-header">
                <div 
                    onClick={()=>history.push("/dashboard/process/fill")}
                >
                    <img src={backBtn} alt="back"/>
                </div>
            </div>
            {loading===true &&
                <div className='map-page-loading'>
                    <img src={loadingGif} alt="loading" />
                </div>
            }
            <AutoComplete
                options={options}
                onSelect={onSelect}
                onSearch={onSearch}
                className='map-page-auto-complete'
                placeholder={selectCoord === null ? "جست و جوی منطقه مورد نظر" : selectCoord}
            />
            <ReactMapGL 
                mapboxApiAccessToken="pk.eyJ1IjoibW9oYW1tYWQtdmFhIiwiYSI6ImNrbDkxdWswcTA1aDYycW9vNm52MWQ1ZW0ifQ.9hKrFV_dAPja2Ch6tfH9Sg" 
                {...viewport}
                onViewportChange={(viewport)=>setViewport(viewport)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={(viewport)=>clickOnMap(viewport)} 
            >
                {showMarker &&
                    <Marker latitude={userLat} longitude={userLong}>
                        <img style={{width:"25px",marginTop:"-15px"}} src={markerIcon} alt="marker" />
                    </Marker>
                }
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