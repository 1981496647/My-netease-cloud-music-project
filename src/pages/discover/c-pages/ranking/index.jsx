import React, { memo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import RankingCover from "./c-pages/rankingcover";
import RankingSongListCover from "./c-pages/songlistcover";
import RankingThemeHeader from "./c-pages/rankingthemeheader/index";
import RankingSongList from "./c-pages/songlist/index";
import "./index.css";
import { getTopListAcion, getToplistDetailAction } from "./store/actionCreters";

export default memo(function Ranking() {
  const { topList, toplistdetail, ids } = useSelector(
    (state) => ({
      topList: state.getIn(["ranking", "topList"]),
      toplistdetail: state.getIn(["ranking", "toplistdetail"]),
      ids: state.getIn(["recommend", "ids"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopListAcion());
    if (ids === null) {
      dispatch(getToplistDetailAction(19723756));
    } else {
      dispatch(getToplistDetailAction(ids));
    }
  }, [dispatch, ids]);

  if (!toplistdetail.id) return <>加载中</>;
  return (
    <div className="content-ranking">
      <div className="ranking-center">
        <div className="ranking-left">
          <h2>云音乐特色榜</h2>
          {topList.map((item, index) => {
            if (index === 3)
              return (
                <div>
                  <RankingCover
                    info={item}
                    key={item.name}
                    dispatch={dispatch}
                  />{" "}
                  <h2>全球媒体榜</h2>
                </div>
              );
            return (
              <RankingCover info={item} key={item.name} dispatch={dispatch} />
            );
          })}
        </div>
        <div className="ranking-right">
          <RankingSongListCover info={toplistdetail} />
          <RankingThemeHeader info={toplistdetail} />
          <div className="rankinglist">
            <div className="titleranking">
              <div className="titlerankingitem">
                {[
                  { name: "wpa", title: "" },
                  { name: "wp", title: "标题" },
                  { name: "wp-t", title: "时长" },
                  { name: "wp-s", title: "歌手" },
                ].map((item) => {
                  return (
                    <div className={item.name} key={item.name}>
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              {toplistdetail.tracks.map((item, index) => {
                return (
                  <RankingSongList
                    info={item}
                    index={index}
                    key={item.id}
                    dispatch={dispatch}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
