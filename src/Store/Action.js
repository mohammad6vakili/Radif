export const HAMBURGER="HAMBURGER";
export const MESSAGE="MESSAGE";
export const LOC_NAME="LOC_NAME";
export const LOC_COORD="LOC_COORD";
export const PROFILE="PROFILE";
export const ORG="ORG";
export const BRAND="BRAND";
export const SERVICE="SERVICE";
export const TURN_DATE="TURN_DATE";
export const LAT="LAT";
export const LNG="LNG";
export const TURN="TURN";
export const RESULT="RESULT";
export const SERVICE_NAME="SERVICE_NAME";
export const SAF="SAF";
export const SELECTED_TURN="SELECTED_TURN";


export const setHamburger=(data)=>{
    return(
        {
            type:HAMBURGER,
            payload:data
        }
    )
}
export const setMessage=(data)=>{
    return(
        {
            type:MESSAGE,
            payload:data
        }
    )
}
export const setLocName=(data)=>{
    return(
        {
            type:LOC_NAME,
            payload:data
        }
    )
}
export const setLocCoord=(data)=>{
    return(
        {
            type:LOC_COORD,
            payload:data
        }
    )
}
export const setProfile=(data)=>{
    return(
        {
            type:PROFILE,
            payload:data
        }
    )
}
export const setOrg=(data)=>{
    return(
        {
            type:ORG,
            payload:data
        }
    )
}
export const setBrand=(data)=>{
    return(
        {
            type:BRAND,
            payload:data
        }
    )
}
export const setService=(data)=>{
    return(
        {
            type:SERVICE,
            payload:data
        }
    )
}
export const setTurnDate=(data)=>{
    return(
        {
            type:TURN_DATE,
            payload:data
        }
    )
}
export const setLat=(data)=>{
    return(
        {
            type:LAT,
            payload:data
        }
    )
}
export const setLng=(data)=>{
    return(
        {
            type:LNG,
            payload:data
        }
    )
}
export const setTurnData=(data)=>{
    return(
        {
            type:TURN,
            payload:data
        }
    )
}
export const setResult=(data)=>{
    return(
        {
            type:RESULT,
            payload:data
        }
    )
}
export const setServiceName=(data)=>{
    return(
        {
            type:SERVICE_NAME,
            payload:data
        }
    )
}
export const setSaf=(data)=>{
    return(
        {
            type:SAF,
            payload:data
        }
    )
}
export const setSelectedTurn=(data)=>{
    return(
        {
            type:SELECTED_TURN,
            payload:data
        }
    )
}