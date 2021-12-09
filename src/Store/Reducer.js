import {
    HAMBURGER,
    NOTIF
} from "./Action";

const initialState = {
    hamburger:false,
    notif:false
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    case NOTIF:
      return {...state, notif: action.payload};
    default:
      return state;
  }
};
export default Reducer;