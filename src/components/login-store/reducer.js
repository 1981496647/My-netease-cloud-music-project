import { Map } from "immutable";
import * as actionTypes from "./constance";
const defaultReducer = Map({
  uniKye: {},
  kuyUrl: null,
  isLogin: false,
});

export default function reducer(state = defaultReducer, action) {
  switch (action.type) {
    case actionTypes.CHANGE_QR_KRY:
      return state.set("uniKye", action.uniKye);
    case actionTypes.CHANGE_QR_URL:
      return state.set("kuyUrl", action.kuyUrl);
    case actionTypes.CHANGE_IS_LOGIN:
      return state.set("isLogin", action.isLogin);
    default:
      return state;
  }
}
