import {
    HAMBURGER,
    LOC_NAME,
    LOC_COORD,
    PROFILE
} from "./Action";

const initialState = {
    hamburger:false,
    locName:"",
    locCoord:null,
    profile:null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    case LOC_NAME:
      return {...state , locName: action.payload};
    case LOC_COORD:
      return {...state , locCoord: action.payload};
    case PROFILE:
      return {...state , profile: action.payload};
    default:
      return state;
  }
};
export default Reducer;