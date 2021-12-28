import {
    HAMBURGER,
    SELECT_COORD
} from "./Action";

const initialState = {
    hamburger:false,
    selectCoord:null
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    case SELECT_COORD:
      return {...state , selectCoord: action.payload};
    default:
      return state;
  }
};
export default Reducer;