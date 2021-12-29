import {
    HAMBURGER,
    LOC_NAME,
    LOC_COORD
} from "./Action";

const initialState = {
    hamburger:false,
    locName:"",
    locCoord:null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    case LOC_NAME:
      return {...state , locName: action.payload};
    case LOC_COORD:
      return {...state , locCoord: action.payload};
    default:
      return state;
  }
};
export default Reducer;