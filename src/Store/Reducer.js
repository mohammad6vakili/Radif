import {
    HAMBURGER,
} from "./Action";

const initialState = {
    hamburger:false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case HAMBURGER:
      return {...state, hamburger: action.payload};
    default:
      return state;
  }
};
export default Reducer;