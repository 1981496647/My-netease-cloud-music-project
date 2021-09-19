import { getRankings } from "../../../../../network/recommend";
import { toplist } from "../../../../../network/toplist";
import * as actionTypes from "./constance";

//展示左边榜单列表
const changeTopListAction = (topList) => ({
  type: actionTypes.CHANGE_TOP_LIST,
  topList,
});
export const getTopListAcion = () => {
  return (dispatch) => {
    toplist().then((res) => {
      console.log(res.list);
      dispatch(changeTopListAction(res.list));
    });
  };
};

//拿到当前的歌单详情
const changeTopListDetailAction = (toplistdetail) => ({
  type: actionTypes.CHANGE_TOP_LIST_DETAIL,
  toplistdetail,
});
export const getToplistDetailAction = (id) => {
  return (dispatch) => {
    getRankings(id).then((res) => {
      console.log(res);
      dispatch(changeTopListDetailAction(res.playlist));
    });
  };
};
