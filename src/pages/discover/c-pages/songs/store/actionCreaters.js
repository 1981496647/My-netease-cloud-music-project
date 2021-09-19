import * as actionTypes from "./constance";

import { getPlaylist, getPlaylistdetail } from "../../../../../network/songs";

const changePlayListAction = (playtoplist) => ({
  type: actionTypes.CHANGE_PLAYLIST_ACTION,
  playtoplist,
});
export const getPlaylistAction = (limit) => {
  return (dispatch) => {
    getPlaylist(limit).then((res) => {
      console.log(res);
      dispatch(changePlayListAction(res.playlists));
    });
  };
};

//存储歌单详细信息
const changePlayListSongDetailAction = (playtoplistDetail) => ({
  type: actionTypes.CHANGE_PLAYLIST_SONGDETAIL,
  playtoplistDetail,
});
export const getPlayListSongDetailAction = (id) => {
  return (dispatch) => {
    getPlaylistdetail(id).then((res) => {
      dispatch(changePlayListSongDetailAction(res.playlist));
      console.log(res.playlist);
    });
  };
};
