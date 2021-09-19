import { Map } from "immutable";
import * as actionTypes from "./constance";

const defaultReducer = Map({
  topList: [],
  toplistdetail: [],
});

function reducer(state = defaultReducer, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_LIST:
      return state.set("topList", action.topList);
    case actionTypes.CHANGE_TOP_LIST_DETAIL:
      return state.set("toplistdetail", action.toplistdetail);
    default:
      return state;
  }
}

export default reducer;
