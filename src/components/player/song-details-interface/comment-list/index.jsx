import React, { memo } from "react";
import { timeComment } from "../../../../unitls/data-from";
import "./index.css";
export default memo(function CommentList(props) {
  const { info } = props;
  if (!info.user) return <></>;
  return (
    <div className="comment-item">
      <div className="user-comment">
        <div className="userPic">
          <img src={info.user.avatarUrl} alt="" />
        </div>
        <div className="userText">
          <div>
            <span className="username">{info.user.nickname}:</span>
            <span>{info.content}</span>
          </div>
          <div className="time-comment">
            <div>{timeComment(info.time)}</div>
            <div className="parameters">
              <div className="like-comment"></div>
              <div className="count">({info.likedCount})</div>
              <div className="l">|</div>
              <div className="reply">回复</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
