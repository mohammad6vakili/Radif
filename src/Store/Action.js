export const HAMBURGER="HAMBURGER";
export const LOC_NAME="LOC_NAME";
export const LOC_COORD="LOC_COORD";
export const PROFILE="PROFILE";


export const setHamburger=(data)=>{
    return(
        {
            type:HAMBURGER,
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