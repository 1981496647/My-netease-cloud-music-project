import {
  getMusicComment,
  getSongLyric,
  getSongUrl,
} from "../../../network/recommend";
import { lyricFormat } from "../../../unitls/lyric-format";
import * as actionTypes from "./constance";

//任何地方  一旦点击播放  要做 的事情 如下 ：
// 获取到当前播放歌曲的信息
//获取到当前播放歌曲 的 url
// 更改播放控件的 显示
// 获取歌词  把他展示到 播放列表中

//播放顺序 的值
export const changeIndexCurrent = (indexCurrents) => ({
  type: actionTypes.CHANGE_CIRCULATIONINDEX,
  indexCurrent: indexCurrents,
});

//获取歌曲url

const changeGetSongUrlAction = (songUrl) => ({
  type: actionTypes.CHANGE_SONGURL,
  songUrl,
});
// const changeIsSongUrlAction = (flag) => ({
//   type: actionTypes.CHANGE_IS_SONG_URL,
//   isSongUrl: flag,
// });

export const getSongUrlAction = (id) => {
  return (dispatch) => {
    getSongUrl(id).then((res) => {
      const songUrl = res.data.map((item) => item.url);
      dispatch(changeGetSongUrlAction(songUrl));
    });
  };
};

//更改播放控件的 状态
export const changeIsplayAction = (flag) => ({
  type: actionTypes.CHANGE_IS_PLAYER,
  isPlay: flag,
});

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENTSONGINDEX,
  currentSongIndex: index,
});

//播放列表

const changeGetSongDetailLisAction = (newList) => ({
  type: actionTypes.CHANGE_GETSONGDETAILLIST,
  songDetailList: newList,
});

export const getSongDetailListAction = (item) => {
  return (dispatch, getState) => {
    const songDetailList = getState().getIn(["player", "songDetailList"]);
    const index = songDetailList.findIndex((ite) => ite.id === item.id);
    if (index < 0) {
      const newList = [item, ...songDetailList];
      // newList.unshift(item);
      dispatch(changeGetSongDetailLisAction(newList));
      dispatch(changeCurrentSongIndexAction(newList.length - 1));
    } else {
      dispatch(changeCurrentSongIndexAction(index));
    }
  };
};

//在播放组件中展示当前正在播放的歌曲
const changeGetSongDetailsAction = (item) => ({
  type: actionTypes.CHANGE_SONGDETAILS,
  songDetails: item,
});
export const getSongDetailsAction = (item) => {
  return (dispatch) => {
    dispatch(changeGetSongDetailsAction(item));
  };
};

//上一曲和下一曲的逻辑
export const getSongDeailActions = (tag) => {
  return (dispatch, getState) => {
    const songDetails = getState().getIn(["player", "songDetails"]);
    const songDetailList = getState().getIn(["player", "songDetailList"]);
    const indexCurrent = getState().getIn(["player", "indexCurrent"]);

    //拿到当前播放歌曲再列表中的索引值 拿到之后立马停止执行
    let currentSongIndex = songDetailList.findIndex(
      (item) => item.id === songDetails.id
    );

    // 通过用户点击的单曲循环还是随机播放修改索引值
    switch (indexCurrent) {
      case 1:
        currentSongIndex = Math.floor(Math.random() * songDetailList.length);
        break;
      default:
        currentSongIndex += tag;
        if (currentSongIndex >= songDetailList.length) currentSongIndex = 0;
        if (currentSongIndex < 0) currentSongIndex = songDetailList.length - 1;
        break;
    }
    // 派发状态
    dispatch(getSongDetailsAction(songDetailList[currentSongIndex]));
    dispatch(getSongUrlAction(songDetailList[currentSongIndex].id));
    dispatch(changeIsplayAction(true));
    dispatch(getSongLyricAction(songDetailList[currentSongIndex].id));
  };
};

//获取歌词
const changeGetSongLyricAction = (lyricList) => ({
  type: actionTypes.CHANGE_SONG_LYRICS,
  songLyric: lyricList,
});
export const getSongLyricAction = (id) => {
  return (dispatch) => {
    getSongLyric(id).then((res) => {
      const lyricList = lyricFormat(res);
      dispatch(changeGetSongLyricAction(lyricList));
    });
  };
};

//获取当前正在展示的歌词
const changeShowGetSongLyricAction = (showSongLyricIndex) => ({
  type: actionTypes.CHANGE_SHOWGETSONGLYRIC,
  showSongLyricIndex,
});
export const getShowSongLyricAction = (lyricTime) => {
  return (dispatch, getState) => {
    const songLyric = getState().getIn(["player", "songLyric"]);
    //拿到当前播放歌词的
    // 把现在实时播放的时间 和 歌词时间做对比  拿到 索引
    if (!songLyric) return;
    let lyricIndex = songLyric.findIndex(
      (item) => lyricTime * 1000 < item.time
    );
    if (lyricIndex === 0) lyricIndex = 1;
    // 拿到正在播放的歌词 的索引
    dispatch(changeShowGetSongLyricAction(lyricIndex));
  };
};

//拿到当前正在播放的歌曲信息 单独存储

const changeSaveSongDetailAction = (songDetails) => ({
  type: actionTypes.CHANGE_SAVE_SONG_DETAIL,
  saveSongDetails: songDetails,
});

export const SaveSongDetailAction = (songDetails) => {
  return (dispatch) => {
    dispatch(changeSaveSongDetailAction(songDetails));
  };
};

//拿到歌曲评论
const changeGetMusicCommentAction = (res) => ({
  type: actionTypes.CHANGE_GET_MUSIC_COMMENT,
  musicComment: res,
});

export const getMusicCommentAction = (id, offset) => {
  return (dispatch) => {
    getMusicComment(id, offset).then((res) => {
      console.log(res);
      dispatch(changeGetMusicCommentAction(res));
    });
  };
};

//保存当前的评论页码数
const changegetMusicCommentOffestAction = (commentOffest) => ({
  type: actionTypes.CHANGE_MUSIC_COMMENT_OFFEST,
  commentOffest,
});
export const getMusicCommentOffestAction = (commentOffest) => {
  return (dispatch) => {
    dispatch(changegetMusicCommentOffestAction(commentOffest));
  };
};

//单独保存每首歌的热评
const changeHotMusicCommentAction = (hotMusicComment) => ({
  type: actionTypes.CHANGE_HOT_MUSIC_COMMENT,
  hotMusicComment,
});
export const getHotMusicCommentAction = (id) => {
  return (dispatch) => {
    getMusicComment(id, 0).then((res) => {
      console.log(res);
      const hotMusicComment = res.hotComments;
      dispatch(changeHotMusicCommentAction(hotMusicComment));
    });
  };
};

//再次存储歌曲的歌词

const changeSaveSongLyricAction = (saveSongLyric) => ({
  type: actionTypes.CHANGE_SAVE_SONGLYRIC,
  saveSongLyric,
});
export const saveSongLyricAction = (id) => {
  return (dispatch) => {
    getSongLyric(id).then((res) => {
      const saveSongLyric = lyricFormat(res);
      dispatch(changeSaveSongLyricAction(saveSongLyric));
    });
  };
};
