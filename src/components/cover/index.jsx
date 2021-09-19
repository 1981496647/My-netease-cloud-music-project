import React, { memo } from "react";
import "./index.css";
import { changeCount } from "../../unitls/data-from";
import { NavLink } from "react-router-dom";
import { getPlayListSongDetailAction } from "../../pages/discover/c-pages/songs/store/actionCreaters";
export default memo(function Cover(props) {
  const { info, dispatch } = props;
  const showPlaylist = (id) => {
    console.log(id);
    dispatch(getPlayListSongDetailAction(id));
  };
  return (
    <NavLink to="/discover/songdetail" onClick={(e) => showPlaylist(info.id)}>
      <div className="caver">
        <div className="caver-top">
          <img src={info.picUrl || info.coverImgUrl} alt="" />
        </div>
        <div className="caver-ball">
          <div className="pos-caver-bottom">
            <div className="pos-caver-icon"></div>
            <div className="pos-caver-count">{changeCount(info.playCount)}</div>
            <div className="pos-caver-player"></div>
          </div>
        </div>
        <div className="cover-bottom">{info.name}</div>
      </div>
    </NavLink>
  );
});
