import { Map } from "immutable";
import * as actionTypes from "./constance";
const defaultState = Map({
  indexCurrent: 0,
  songUrl: [],
  isPlay: false,
  songDetailList: [],
  songDetails: {},
  saveSongDetails: {},
  saveSongLyric: [],
  currentSongIndex: 0,
  songLyric: [],
  showSongLyricIndex: 0,
  musicComment: [],
  commentOffest: 0,
  hotMusicComment: [],
});
function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CIRCULATIONINDEX:
      return state.set("indexCurrent", action.indexCurrent);
    case actionTypes.CHANGE_SONGURL:
      return state.set("songUrl", action.songUrl);
    case actionTypes.CHANGE_IS_PLAYER:
      return state.set("isPlay", action.isPlay);
    case actionTypes.CHANGE_GETSONGDETAILLIST:
      return state.set("songDetailList", action.songDetailList);
    case actionTypes.CHANGE_SONGDETAILS:
      return state.set("songDetails", action.songDetails);
    case actionTypes.CHANGE_CURRENTSONGINDEX:
      return state.set("currentSongIndex", action.currentSongIndex);
    case actionTypes.CHANGE_SONG_LYRICS:
      return state.set("songLyric", action.songLyric);
    case actionTypes.CHANGE_SHOWGETSONGLYRIC:
      return state.set("showSongLyricIndex", action.showSongLyricIndex);
    case actionTypes.CHANGE_SAVE_SONG_DETAIL:
      return state.set("saveSongDetails", action.saveSongDetails);
    case actionTypes.CHANGE_GET_MUSIC_COMMENT:
      return state.set("musicComment", action.musicComment);
    case actionTypes.CHANGE_SAVE_SONGLYRIC:
      return state.set("saveSongLyric", action.saveSongLyric);
    case actionTypes.CHANGE_MUSIC_COMMENT_OFFEST:
      return state.set("commentOffest", action.commentOffest);
    case actionTypes.CHANGE_HOT_MUSIC_COMMENT:
      return state.set("hotMusicComment", action.hotMusicComment);
    default:
      return state;
  }
}
export default reducer;
