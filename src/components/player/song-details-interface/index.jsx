import React, { memo, useEffect, useRef, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  getHotMusicCommentAction,
  getMusicCommentAction,
  getMusicCommentOffestAction,
  saveSongLyricAction,
} from "../store/acionCreators";

// import {Pagination} from "antd"
import ThemeHeader from "../../theme-header-cpn/index";
import CommentList from "./comment-list/index";

import loading from "../../../assets/img/loading.gif";
import "./index.css";
export default memo(function SongDetailsPlayer() {
  const dispatch = useDispatch();
  const {
    saveSongDetails,
    musicComment,
    saveSongLyric,
    commentOffest,
    hotMusicComment,
  } = useSelector(
    (state) => ({
      saveSongDetails: state.getIn(["player", "saveSongDetails"]),
      musicComment: state.getIn(["player", "musicComment"]),
      saveSongLyric: state.getIn(["player", "saveSongLyric"]),
      commentOffest: state.getIn(["player", "commentOffest"]),
      hotMusicComment: state.getIn(["player", "hotMusicComment"]),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (saveSongDetails.id)
      dispatch(getMusicCommentAction(saveSongDetails.id, 0));
    dispatch(getHotMusicCommentAction(saveSongDetails.id));
    if (saveSongDetails.id) dispatch(saveSongLyricAction(saveSongDetails.id));
  }, [dispatch, saveSongDetails]);

  const [isFold, setIsFold] = useState(true);

  const foldRef = useRef();
  const textRef = useRef();
  const inputRef = useRef();

  if (!saveSongDetails.name)
    return (
      <div
        style={{
          width: "100%",
          height: "1500px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={loading} alt="" style={{ width: "658px", height: "494px" }} />
      </div>
    );
  if (!musicComment.total)
    return (
      <div
        style={{
          width: "100%",
          height: "1500px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={loading} alt="" style={{ width: "658px", height: "494px" }} />
      </div>
    );
  //点击展开歌词

  // 判断是否展开还是收起
  const fold = () => {
    if (isFold) {
      foldRef.current.style.display = "block";
      console.log(textRef);
      textRef.current.innerHTML = "收起";
      setIsFold(false);
    } else {
      foldRef.current.style.display = "none";
      textRef.current.innerHTML = "展开";

      setIsFold(true);
    }
  };

  //遍历 出 页码数

  //点击上一夜下一页
  const showNext = (tag) => {
    console.log("点击", tag);
    if (
      commentOffest + tag < 0 ||
      commentOffest + tag > Math.ceil(musicComment.total / 20)
    )
      return;
    dispatch(getMusicCommentOffestAction(commentOffest + tag));
    dispatch(getMusicCommentAction(saveSongDetails.id, commentOffest + tag));
  };
  //键盘谈起事件
  const enterClick = (e) => {
    if (e.target.value.trim() === "") return;
    if (typeof (e.target.value * 1) !== "number") return;
    if (e.keyCode !== 13) return;
    if (
      e.target.value * 1 > Math.ceil(musicComment.total / 20) ||
      e.target.value * 1 < 0
    )
      return;
    dispatch(getMusicCommentAction(saveSongDetails.id, e.target.value * 1));
    dispatch(getMusicCommentOffestAction(e.target.value * 1));
  };
  return (
    <div className="songdetail">
      <div className="songdetail-center">
        <div className="songdetail-left">
          <div style={{ display: "flex" }}>
            <div className="songCover">
              <div className="song-pic">
                <img src={saveSongDetails.al.picUrl} alt="" />
              </div>
              <a href="/">生成链外播放器</a>
            </div>
            <div className="songCover-right">
              <div className="song-title">
                <div style={{ display: "flex" }}>
                  <div className="title-icon"></div>
                  <div className="songtitle">{saveSongDetails.name}</div>
                </div>
                <div className="artist-song font-song">
                  歌手 :{"    "}
                  <span style={{ color: "#0c73c2" }}>
                    {saveSongDetails.ar.map((item) => item.name + "/")}
                  </span>
                </div>
                <div className="artist-desc font-song">
                  所属专辑:{" "}
                  <span style={{ color: "#0c73c2" }}>
                    {saveSongDetails.al.name}
                  </span>
                </div>
                <div className="btn-song">
                  <div className="song-player">
                    <div>播放</div>
                    <div></div>
                  </div>
                  <div className="favorite">收藏</div>
                  <div className="share">分享</div>
                  <div className="download-play">下载</div>
                  <div className="comment">
                    <div></div>({musicComment.total || 0})
                  </div>
                </div>
              </div>
              <div className="song-lyric">
                {saveSongLyric.slice(0, 13).map((item) => {
                  return <p key={item.time}>{item.content}</p>;
                })}
                <div className="song-lyric-hidden" ref={foldRef}>
                  {saveSongLyric.slice(13, saveSongLyric.length).map((item) => {
                    return <p key={item.time}>{item.content}</p>;
                  })}
                </div>
              </div>

              <div
                className="btn-display"
                ref={textRef}
                onClick={(e) => fold()}
              >
                展开
              </div>
            </div>
          </div>
          {/* 评论信息 */}

          <div className="commentList">
            <ThemeHeader
              title="评论"
              keywords={[
                `共${musicComment.total <= 0 ? 0 : musicComment.total}条评论`,
              ]}
            />

            <div className="hotComments">精彩评论</div>
            {hotMusicComment.map((item) => {
              return <CommentList info={item} key={item.content} />;
            })}

            <div className="hotComments">最新评论</div>
            {musicComment.comments.map((item) => {
              return <CommentList info={item} key={item.commentId} />;
            })}

            <div className="btn-next">
              <div className="btn-next-1 b-p" onClick={(e) => showNext(-1)}>
                上一页
              </div>
              <div className="btn-num">
                第{commentOffest}页/共{Math.ceil(musicComment.total / 20)}页
              </div>
              <div className="btn-next-1 b-n" onClick={(e) => showNext(1)}>
                下一页
              </div>
              <span>
                跳转到第
                <input
                  type="text"
                  ref={inputRef}
                  onKeyUp={(e) => enterClick(e)}
                />
                页
              </span>
              {/* <Pagination defaultCurrent={1} showSizeChanger={false} total={Math.ceil(musicComment.total / 20)} /> */}
            </div>
          </div>
        </div>

        <div className="Songinformation">我是中间右边的内容</div>
      </div>
    </div>
  );
});
