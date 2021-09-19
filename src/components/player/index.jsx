import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavLink } from "react-router-dom";
import { Slider } from "antd";
import PlayListSong from "./playlist/index";

import {
  changeIndexCurrent,
  changeIsplayAction,
  getShowSongLyricAction,
  getSongDeailActions,
  SaveSongDetailAction,
} from "./store/acionCreators";
import { time, timeSong } from "../../unitls/data-from";

import "./index.css";
import { Playercss } from "./style";
import playbarImg from "../../assets/img/playbar.png";

export default memo(function MusicPlayerComponent() {
  const {
    songDetails,
    songUrl,
    isPlay,
    indexCurrent,
    songDetailList,
    showSongLyricIndex,
    songLyric,
  } = useSelector(
    (state) => ({
      songDetails: state.getIn(["player", "songDetails"]),
      songUrl: state.getIn(["player", "songUrl"]),
      isPlay: state.getIn(["player", "isPlay"]),
      indexCurrent: state.getIn(["player", "indexCurrent"]),
      songDetailList: state.getIn(["player", "songDetailList"]),
      songLyric: state.getIn(["player", "songLyric"]),
      showSongLyricIndex: state.getIn(["player", "showSongLyricIndex"]),
      saveSongDetails: state.getIn(["player", "saveSongDetails"]),
    }),
    shallowEqual
  );

  //展示组件数据
  const showImg = (songDetails) => {
    if (songDetails.name) {
      return <img src={songDetails.al.picUrl} alt="" />;
    } else {
      return <></>;
    }
  };

  //展示组件数据
  const showArtistandSong = (songDetails) => {
    if (songDetails.name) {
      return (
        <div className="artist-song">
          <span>{songDetails.name}</span>
          <span>
            {songDetails.ar.map((item, index_, arr_) => {
              if (arr_.length > 1) {
                return index_ < arr_.length - 1 ? item.name + "/" : item.name;
              } else {
                return item.name;
              }
            })}
          </span>
        </div>
      );
    } else {
      return <div className="artist-song"></div>;
    }
  };

  //其他业务逻辑

  //右边 循环逻辑
  const dispatch = useDispatch();
  const showIndex = () => {
    let indexCurrents = indexCurrent + 1;
    if (indexCurrents > 2) indexCurrents = 0;
    dispatch(changeIndexCurrent(indexCurrents));
  };

  //播放控件

  const audioRef = useRef();
  const playsongRef = useRef();
  const [flag, setflag] = useState(false);
  const showPlay = () => {
    if (flag) {
      setflag(false);
      dispatch(changeIsplayAction(flag));
    } else {
      setflag(true);
      dispatch(changeIsplayAction(flag));
    }
  };
  //通过  状态 改变 按钮
  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
      setflag(false);
      playsongRef.current.style.backgroundPosition = "-40px -165px";
    } else {
      audioRef.current.pause();
      setflag(true);
      playsongRef.current.style.backgroundPosition = "0 -204px";
    }
  }, [isPlay]);

  //获取实时的 播放时间
  //获取当前进度条的百分比  当前实时播放的时间 / 总时间

  const [progressPercentage, setprogressPercentage] = useState(0);

  //判断有没有在播放
  const [ischange, setIsChange] = useState(false);

  //获取当前歌曲实时播放时间的状态
  const [currentTime, setCurrentTime] = useState(0);
  const showTime = (e) => {
    if (!ischange) {
      setCurrentTime(e.target.currentTime);
      setprogressPercentage(
        (currentTime /
          (songDetails.dt === undefined ? 1 : songDetails.dt / 1000)) *
          100
      );
    }
    //播放完毕后播放下一首
    if (parseInt(currentTime) >= parseInt(songDetails.dt / 1000) - 1) {
      switch (indexCurrent) {
        case 0:
          dispatch(getSongDeailActions(1));
          break;
        case 1:
          dispatch(getSongDeailActions(1));
          break;
        default:
          audioRef.current.currentTime = 0;
      }
    }
    //展示歌词
    // 拿到当前播放歌词的索引
    //节流操作
    if (!songLyric) {
      return;
    } else {
      const iii = songLyric.findIndex((item) => currentTime * 1000 < item.time);
      if (iii !== showSongLyricIndex) {
        dispatch(getShowSongLyricAction(currentTime));
      }
    }
  };
  //进度条事件
  //进度条拖拽事件
  const showValue = useCallback(
    (value) => {
      setIsChange(true);
      setprogressPercentage(value);
      setCurrentTime(((value / 100) * songDetails.dt) / 1000);
    },
    [songDetails.dt]
  );

  //进度条拖拽完 鼠标弹起后的事件
  const showValues = useCallback(
    (value) => {
      //给audio的实时时间赋值
      audioRef.current.currentTime = parseInt(
        ((value / 100) * songDetails.dt) / 1000
      );
      setCurrentTime(((value / 100) * songDetails.dt) / 1000);
      setIsChange(false);

      if (ischange) {
        audioRef.current.play();
        dispatch(changeIsplayAction(true));
        setflag(false);
      }
    },
    [songDetails.dt, ischange, dispatch]
  );

  //控制播放列表的显示和隐藏
  const playlistRef = useRef();
  const [isDisplay, setIsDisplay] = useState(true);
  const showPlaylist = () => {
    setIsDisplay(!isDisplay);
    if (isDisplay) {
      playlistRef.current.style.display = "block";
    } else {
      playlistRef.current.style.display = "none";
    }
  };

  // ************************************************************* 上一曲/下一曲
  const changeMusic = (tag) => {
    if (songDetailList.length === 0) return;
    dispatch(getSongDeailActions(tag));
  };
  //点击图片 跳转 歌曲详情页
  //点击的时候 拿到当前的歌曲信息  单独存储  这样 点击上一曲下一曲 就不会被影响
  const songDetail = () => {
    dispatch(SaveSongDetailAction(songDetails));
  };
  return (
    <div className="playerbar">
      {/* 左边的播放功能 上一曲下一曲 */}
      <div className="playbercenter">
        <div className="btns">
          <div className="prev" onClick={(e) => changeMusic(-1)}></div>
          <div
            className="playsong"
            ref={playsongRef}
            onClick={(e) => showPlay()}
          ></div>
          <div className="nexts" onClick={(e) => changeMusic(1)}></div>
        </div>

        {/* 中间的进度条功能 以及时间的显示 */}
        <div className="play">
          <div className="mask">
            <div className="imageplay">
              {showImg(songDetails)}
              <NavLink to="/discover/player" onClick={(e) => songDetail()}>
                <div className="pos-bar"></div>
              </NavLink>
            </div>
          </div>

          <div className="progressbar">
            {showArtistandSong(songDetails)}
            <div className="gressbar">
              <Slider
                onChange={showValue}
                onAfterChange={showValues}
                value={progressPercentage}
              />
              <div className="time-song">
                <span>{timeSong(currentTime)}</span>
                <span>/</span>
                <span>{time(songDetails.dt)}</span>
              </div>
            </div>
          </div>
        </div>
        {/* 右边的分享功能 */}
        <div className="oper">
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* 最右边的展示播放队列 */}
        <Playercss playbarImg={playbarImg} indexCurrent={indexCurrent}>
          <div className="volume"></div>
          <div className="circulation" onClick={(e) => showIndex()}></div>
          <div className="playback" onClick={(e) => showPlaylist()}>
            <span> {songDetailList.length}</span>
          </div>
        </Playercss>
        <div className="playlist-display" ref={playlistRef}>
          <PlayListSong />
        </div>
      </div>

      <audio src={songUrl[0]} autoPlay ref={audioRef} onTimeUpdate={showTime} />
    </div>
  );
});
