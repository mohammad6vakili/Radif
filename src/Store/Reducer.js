import {
    HAMBURGER,
    MESSAGE,
    LOC_NAME,
    LOC_COORD,
    PROFILE,
    ORG,
    BRAND,
    SERVICE,
    LAT,
    LNG
} from "./Action";

const initialState = {
    hamburger:false,
    message:null,
    locName:"",
    locCoord:null,
    profile:null,
    org:null,
    brand:null,
    service:null,
    lat:null,
    lng:null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    case MESSAGE:
      return {...state, message: action.payload};
    case LOC_NAME:
      return {...state , locName: action.payload};
    case LOC_COORD:
      return {...state , locCoord: action.payload};
    case PROFILE:
      return {...state , profile: action.payload};
    case ORG:
      return {...state , org: action.payload};
    case BRAND:
      return {...state , brand: action.payload};
    case SERVICE:
      return {...state , service: action.payload};
    case LAT:
      return {...state , lat: action.payload};
    case LNG:
      return {...state , lng: action.payload};
    default:
      return state;
  }
};
export default Reducer;