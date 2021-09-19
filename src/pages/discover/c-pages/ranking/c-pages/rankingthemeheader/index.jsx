import React, { memo } from "react";
import "./index.css";
export default memo(function RankingThemeHeader(props) {
  const { info } = props;

  if (!info.tracks) return <>加载中</>;
  console.log(info);
  return (
    <div className="RankingThemeHeader">
      <div className="title">歌曲列表</div>
      <div>{info.tracks.length || 0}首歌</div>
      <div>
        播放: <span>{info.playCount}</span> 次
      </div>
    </div>
  );
});
