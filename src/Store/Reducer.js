import {
    HAMBURGER,
    MESSAGE,
    LOC_NAME,
    LOC_COORD,
    PROFILE,
    ORG,
    BRAND,
    SERVICE,
    TURN_DATE,
    LAT,
    LNG,
    TURN,
    RESULT,
    SERVICE_NAME,
    SAF,
    SELECTED_TURN,
    IS_OTHER,
    OTHER,
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
    turnDate:null,
    lat:null,
    lng:null,
    turn:null,
    result:null,
    serviceName:null,
    saf:null,
    selectedTurn:null,
    isOther:"0",
    other:{}
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
    case TURN_DATE:
      return {...state , turnDate: action.payload};
    case LAT:
      return {...state , lat: action.payload};
    case LNG:
      return {...state , lng: action.payload};
    case TURN:
      return {...state , turn: action.payload};
    case RESULT:
      return {...state , result: action.payload};
    case SERVICE_NAME:
      return {...state , serviceName: action.payload};
    case SAF:
      return {...state , saf: action.payload};
    case SELECTED_TURN:
      return {...state , selectedTurn: action.payload};
    case IS_OTHER:
      return {...state , isOther: action.payload};
    case OTHER:
      return {...state , other: action.payload};
    default:
      return state;
  }
};
export default Reducer;