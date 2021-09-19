import React, { memo } from "react";

import { getToplistDetailAction } from "../../store/actionCreters";
import "./index.css";

export default memo(function RankingCover(props) {
  const { info ,dispatch} = props;
  if (!info) return <>加载中</>;
  const showRanking = (info) => {
    dispatch(getToplistDetailAction(info.id));
  };
  return (
    <div className="cover-rank" onClick={(e) => showRanking(info)}>
      <div className="coverimg">
        <img src={info.coverImgUrl} alt="" />
      </div>
      <div className="cover-info">
        <div className="covername">{info.name}</div>
        <div className="updateFrequency">{info.updateFrequency}</div>
      </div>
    </div>
  );
});
