import React, { useState } from 'react';
import "./MapPage.css";
import ReactMapGL,{Marker} from "react-map-gl";
import markerIcon from "../../Assets/Images/location-marker.png";


const MapPage=()=>{

    const [userLat , setUserLat]=useState(parseFloat(localStorage.getItem("lat")));
    const [userLong , setUserLong]=useState(parseFloat(localStorage.getItem("long")));
    const [viewport , setViewport]=useState({
        latitude:parseFloat(userLat),
        longitude:parseFloat(userLong),
        width:"100%",
        height:"100vh",
        zoom:15
    });

    const clickOnMap=(viewport)=>{
        setUserLat(viewport.lngLat[0]);
        setUserLong(viewport.lngLat[1]);
        console.log(userLat , userLong);
    }

    return(
        <div className='map-page'>
            <ReactMapGL 
                mapboxApiAccessToken="pk.eyJ1IjoibW9oYW1tYWQtdmFhIiwiYSI6ImNrbDkxdWswcTA1aDYycW9vNm52MWQ1ZW0ifQ.9hKrFV_dAPja2Ch6tfH9Sg" 
                {...viewport}
                onViewportChange={(viewport)=>setViewport(viewport)}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onClick={(viewport)=>clickOnMap(viewport)} 
            >
                <Marker latitude={userLat} longitude={userLong}>
                    <img style={{width:"25px",marginTop:"-15px"}} src={markerIcon} alt="marker" />
                </Marker>
            </ReactMapGL>
        </div>
    )
}
export default MapPage;