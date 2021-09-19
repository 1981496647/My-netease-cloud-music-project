import React, { memo } from "react";
import "./index.css";
import { time } from "../../../../unitls/data-from";
import {
  changeIsplayAction,
  getSongDetailsAction,
  getSongLyricAction,
  getSongUrlAction,
} from "../../store/acionCreators";
export default memo(function SongPlayList(props) {
  const { info, songDetails, dispatch } = props;
  if (info === undefined) return <></>;

  const playSong = (info) => {
    dispatch(getSongUrlAction(info.id));
    dispatch(getSongDetailsAction(info));
    dispatch(changeIsplayAction(true));
    dispatch(getSongLyricAction(info.id));
  };
  return (
    <div className="playsong-url" onClick={(e) => playSong(info)}>
      <div className={info.id === songDetails.id ? "song-icon" : ""}></div>
      <div className="songname">{info.name}</div>
      <div className="song-icon-btn">
        {["icon-add", "icon-share", "icon-dol", "icon-del"].map((item) => (
          <div
            className={item}
            key={item}
            style={{ margin: "0 0 0 10px" }}
          ></div>
        ))}
      </div>
      <div className="artist-song-list">{info.ar[0].name}</div>
      <div className="song-time">{time(info.dt)}</div>
      <div className="song-link">
        <span></span>
      </div>
    </div>
  );
});
