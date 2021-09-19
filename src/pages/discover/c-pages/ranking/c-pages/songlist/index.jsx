import React, { memo } from "react";
import { time } from "../../../../../../unitls/data-from";

import {
  changeIsplayAction,
  getSongDetailListAction,
  getSongDetailsAction,
  getSongLyricAction,
  getSongUrlAction,
} from "../../../../../../components/player/store/acionCreators";
import "./index.css";
export default memo(function RankingSongList(props) {
  const { info, index, dispatch } = props;
  if (!info) return <>加载中</>;

  const showImg = (index) => {
    if (index < 3)
      return (
        <img
          src={info.al.picUrl}
          alt=""
          style={{ height: "50px", marginRight: "10px" }}
        />
      );
  };
  const playClick = (info) => {
    console.log(info.id);
    dispatch(getSongDetailsAction(info));
    dispatch(getSongUrlAction(info.id));
    dispatch(changeIsplayAction(true));

    dispatch(getSongLyricAction(info.id));
    dispatch(getSongDetailListAction(info));
  };

  return (
    <div
      className="info"
      style={{ background: index % 2 === 0 ? "rgb(247,247,247)" : "#fff" }}
    >
      <div className="index">{index + 1}</div>
      <div className="image-rankcover">
        {showImg(index)}
        <div className="play" onClick={(e) => playClick(info)}></div>
        <div className="infoname">{info.name}</div>
      </div>
      <div className="infotime">{time(info.dt)}</div>
      <div className="infosinger">{info.ar.map((item) => item.name)}</div>
    </div>
  );
});
