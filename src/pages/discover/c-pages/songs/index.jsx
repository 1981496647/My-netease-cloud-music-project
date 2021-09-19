import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Cover from "../../../../components/cover";
import ThemeHeader from "../../../../components/theme-header-cpn";
import "./index.css";
import { getPlaylistAction } from "./store/actionCreaters";

import RankingCover from "../ranking/c-pages/rankingcover";
export default memo(function Somgs() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlaylistAction(1300));
  }, [dispatch]);

  const { playtoplist } = useSelector((state) => ({
    playtoplist: state.getIn(["songs", "playtoplist"]),
  }));
  return (
    <div className="songs">
      <div className="songscenter">
        <ThemeHeader title={"全部"} />
        <div className="songsbottom">
          {playtoplist.map((item) => {
            return <Cover info={item} key={item.id} dispatch={dispatch} />;
          })}
        </div>
      </div>
    </div>
  );
});
