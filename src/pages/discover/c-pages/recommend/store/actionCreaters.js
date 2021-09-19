import * as actionTypes from "./constance";
import {
  getTopbanner,
  getHotRecommend,
  getNewAlbum,
  getRankings,
} from "@/network/recommend";
const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});
export const getTopBannerAction = () => {
  return (dispatch) => {
    getTopbanner().then((res) => {
      dispatch(changeTopBannerAction(res));
    });
  };
};

const changeGetHotRecommend = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result,
});

export const getHotRecommendAction = (limit) => {
  return (dispatch) => {
    getHotRecommend(limit).then((res) => {
      dispatch(changeGetHotRecommend(res));
    });
  };
};

const changeGetNewAlbumAction = (newAlbumData) => ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbum: newAlbumData,
});

export const getNewAlbumAction = (limit) => {
  return (dispatch) => {
    getNewAlbum(limit).then((res) => {
      const newAlbumData =
        res.weekData.length === 0
          ? res.mouthData.slice(0, 10)
          : res.weekData.slice(0, 10);
      dispatch(changeGetNewAlbumAction(newAlbumData));
    });
  };
};

const changeGetRankingAction = (res) => ({
  type: actionTypes.CHANGE_RANKING_FLY,
  flyPlaylist: res,
});
const changeGetRankingActions = (res) => ({
  type: actionTypes.CHANGE_RANKING_NEWSONGS,
  newSongsList: res,
});
const changeGetRankingActionss = (res) => ({
  type: actionTypes.CHANGE_RANKING_ORIGIANL,
  originalList: res,
});
export const getRankingAction = (id) => {
  return (dispatch) => {
    getRankings(id).then((res) => {
      switch (res.playlist.name) {
        case "飙升榜":
          return dispatch(changeGetRankingAction(res));
        case "新歌榜":
          return dispatch(changeGetRankingActions(res));
        case "原创榜":
          return dispatch(changeGetRankingActionss(res));
        default:
          return "";
      }
    });
  };
};

//存储 点击查看全部的 id
const changeLearnMoreAction = (ids) => ({
  type: actionTypes.CHANGE_LEARN_MORE,
  ids,
});
export const getLearnMoreAction = (id) => {
  return (dispatch) => {
    dispatch(changeLearnMoreAction(id));
  };
};
