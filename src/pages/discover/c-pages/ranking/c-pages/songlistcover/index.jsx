import React, { memo } from "react";
import { timeComment } from "../../../../../../unitls/data-from";
import "./index.css";
export default memo(function RankingSongListCover(props) {
  const { info } = props;
  if (!info) return <>加载中</>;
  console.log(info);
  return (
    <div className="rankingcover">
      <div className="coverimg">
        <img src={info.coverImgUrl} alt="" />
        <div className="pos-coverimg"></div>
      </div>
      <div className="Coverinfo">
        <div className="coverName">{info.name}</div>
        <div className="createtime">
          最近更新:{timeComment(info.updateTime)}
        </div>

        <div className="btn-song">
          <div className="song-player">
            <div>播放</div>
            <div></div>
          </div>
          <div className="favorite">({info.subscribedCount})</div>
          <div className="share">({info.shareCount})</div>
          <div className="download-play">下载</div>
          <div className="comment">
            <div></div>({info.commentCount})
          </div>
        </div>
      </div>
    </div>
  );
});
