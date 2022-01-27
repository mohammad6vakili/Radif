export const HAMBURGER="HAMBURGER";
export const MESSAGE="MESSAGE";
export const LOC_NAME="LOC_NAME";
export const LOC_COORD="LOC_COORD";
export const PROFILE="PROFILE";
export const ORG="ORG";
export const BRAND="BRAND";
export const SERVICE="SERVICE";
export const LAT="LAT";
export const LNG="LNG";



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