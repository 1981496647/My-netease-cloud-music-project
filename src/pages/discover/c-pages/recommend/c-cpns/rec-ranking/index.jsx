import React, { memo, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getLearnMoreAction,
  getRankingAction,
} from "../../store/actionCreaters";

import ThemeHeader from "@/components/theme-header-cpn/index";
import Cover from "@/components/rec-ranking-cover/Cover";
import "./index.css";

export default memo(function TopRanking() {
  //获取id

  const dispatch = useDispatch();
  useEffect(() => {
    //飙升榜
    dispatch(getRankingAction(19723756));
    //新歌榜
    dispatch(getRankingAction(3779629));
    //原创榜
    dispatch(getRankingAction(2884035));
  }, [dispatch]);

  const { flyPlaylist, newSongsList, originalList } = useSelector(
    (state) => ({
      flyPlaylist: state.getIn(["recommend", "flyPlaylist"]),
      newSongsList: state.getIn(["recommend", "newSongsList"]),
      originalList: state.getIn(["recommend", "originalList"]),
    }),
    shallowEqual
  );

  const showTopList = (id) => {
    dispatch(getLearnMoreAction(id));
  };
  return (
    <div className="topRanking">
      <ThemeHeader title={"榜单"} />
      <div className="bilst">
        {/* 飙升榜 */}
        <div className="cover-left item-cover">
          <Cover info={flyPlaylist} />
          <NavLink
            to="/discover/ranking"
            className="learnmore"
            onClick={(e) => showTopList(flyPlaylist.playlist.id)}
          >
            查看全部{">>"}
          </NavLink>
        </div>
        {/* 新歌榜 */}
        <div className="cover-center item-cover">
          <Cover info={newSongsList} />
          <NavLink
            to="/discover/ranking"
            className="learnmore"
            onClick={(e) => showTopList(newSongsList.playlist.id)}
          >
            查看全部{">>"}
          </NavLink>
        </div>
        {/* 原创榜 */}
        <div className="cover-right item-cover">
          <Cover info={originalList} />
          <NavLink
            className="learnmore"
            to="/discover/ranking"
            onClick={(e) => showTopList(originalList.playlist.id)}
          >
            查看全部{">>"}
          </NavLink>
        </div>
      </div>
    </div>
  );
});
