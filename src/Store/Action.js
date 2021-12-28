export const HAMBURGER="HAMBURGER";
export const SELECT_COORD="SELECT_COORD";


export const setHamburger=(data)=>{
    return(
        {
            type:HAMBURGER,
            payload:data
        }
    )
}
export const setSelectCoord=(data)=>{
    return(
        {
            type:SELECT_COORD,
            payload:data
        }
    )
}