import React, { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import SongPlayList from "./playlist-song/index";
import "./index.css";
import { useSelector } from "react-redux";
export default memo(function PlayListSong() {
  const { songDetailList, songDetails, songLyric, showSongLyricIndex } =
    useSelector((state) => ({
      songDetailList: state.getIn(["player", "songDetailList"]),
      songDetails: state.getIn(["player", "songDetails"]),
      songLyric: state.getIn(["player", "songLyric"]),
      showSongLyricIndex: state.getIn(["player", "showSongLyricIndex"]),
    }));
  const dispatch = useDispatch();
  // console.log(songDetailList);
  const lyricRef = useRef();
  useEffect(() => {
    // console.log(
    //   showSongLyricIndex - 1,
    //   lyricRef.current.childNodes[showSongLyricIndex - 1]
    // );
    lyricRef.current.childNodes.forEach((item, index) => {
      item.className = "";
      if (showSongLyricIndex - 1 === index) {
        item.className = "";
        lyricRef.current.childNodes[showSongLyricIndex].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
      lyricRef.current.childNodes[
        showSongLyricIndex < 0
          ? lyricRef.current.childNodes.length - 1
          : showSongLyricIndex
      ].className = "transfromY";
    });
  }, [showSongLyricIndex]);
  //判断有没有歌词
  const showLyric = (songLyric) => {
    if (!songLyric) return <>纯音乐,暂无歌词</>;
    return songLyric.map((item) => {
      return <p key={item.time}>{item.content ? item.content : ""}</p>;
    });
  };
  return (
    <div className="playlist">
      <div className="playlist-left">
        <div className="left-list-title">
          <p className="left-list-text">播放列表({songDetailList.length})</p>
          <div className="left-a">
            <span></span>
            <p>收藏全部</p>
          </div>
          <div className="left-a-clear">
            <span></span>
            <p>清除</p>
          </div>
        </div>

        <div className="list-detail">
          {songDetailList.map((item) => (
            <SongPlayList
              info={item}
              key={item.id}
              songDetails={songDetails}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      <div className="playlist-right">
        <div className="playlist-right-title">{songDetails.name}</div>
        <div className="playlist-lyric" ref={lyricRef}>
          <div className="pos-lyric"></div>

          {showLyric(songLyric)}
        </div>
      </div>
    </div>
  );
});
