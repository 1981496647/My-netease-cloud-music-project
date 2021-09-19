import { Map } from "immutable";
import * as actionTypes from "./constance";
const defaultReducer = Map({
  playtoplist: [],
  playtoplistDetail: [],
});

export default function reducer(state = defaultReducer, action) {
  switch (action.type) {
    case actionTypes.CHANGE_PLAYLIST_ACTION:
      return state.set("playtoplist", action.playtoplist);
    case actionTypes.CHANGE_PLAYLIST_SONGDETAIL:
      return state.set("playtoplistDetail", action.playtoplistDetail);
    default:
      return state;
  }
}
