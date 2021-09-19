import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { getHotRecommendAction } from "../../store/actionCreaters";

import ThemeHeader from "@/components/theme-header-cpn/index";
import Cover from "@/components/cover";
import NewAlbum from "../new-album";
import TopRanking from "../rec-ranking/index";
import SetterSinger from "../setter-singer/index";
import UserLogin from "../user-login/index";

import HotSinger from "../hot-singer/index";
import "./index.css";

export default memo(function HotRecommend() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotRecommendAction(8));
  }, [dispatch]);

  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(["recommend", "hotRecommends"]),
    }),
    shallowEqual
  );

  return (
    <div className="hotrecommend">
      <div className="hotCenterrecommend">
        <div className="hotcenterleft">
          <ThemeHeader
            title={"热门推荐"}
            keywords={["华语", "流行", "民谣", "摇滚", "电子"]}
          />
          <div className="cover-item">
            {hotRecommends.map((item) => {
              return <Cover info={item} key={item.id} dispatch={dispatch} />;
            })}
          </div>
          <NewAlbum />
          <TopRanking />
        </div>
        <div className="hotcenterright">
          <UserLogin />
          <SetterSinger />
          <HotSinger />
        </div>
      </div>
    </div>
  );
});
