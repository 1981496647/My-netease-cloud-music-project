import { Map } from "immutable";

import * as actionTypes from "./constance";

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbum: [],
  flyPlaylist: [],
  newSongsList: [],
  originalList: [],
  ids: null,
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set("topBanners", action.topBanners);
    case actionTypes.CHANGE_HOT_RECOMMENDS:
      return state.set("hotRecommends", action.hotRecommends);
    case actionTypes.CHANGE_NEW_ALBUM:
      return state.set("newAlbum", action.newAlbum);
    case actionTypes.CHANGE_RANKING_FLY:
      return state.set("flyPlaylist", action.flyPlaylist);
    case actionTypes.CHANGE_RANKING_NEWSONGS:
      return state.set("newSongsList", action.newSongsList);
    case actionTypes.CHANGE_RANKING_ORIGIANL:
      return state.set("originalList", action.originalList);
    case actionTypes.CHANGE_LEARN_MORE:
      return state.set("ids", action.ids);
    default:
      return state;
  }
}
export default reducer;
