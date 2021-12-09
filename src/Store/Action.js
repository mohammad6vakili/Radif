export const HAMBURGER="HAMBURGER";
export const NOTIF="NOTIF";


export const setHamburger=(data)=>{
    return(
        {
            type:HAMBURGER,
            payload:data
        }
    )
}
export const setNotif=(data)=>{
    return(
        {
            type:NOTIF,
            payload:data
        }
    )
}