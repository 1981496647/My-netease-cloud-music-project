import React, { memo } from "react";
import { useDispatch } from "react-redux";
import {
  changeIsplayAction,
  getSongUrlAction,
  getSongDetailsAction,
  getSongDetailListAction,
  getSongLyricAction,
} from "../player/store/acionCreators";
import "./index.css";
export default memo(function Cover(props) {
  const { info } = props;

  const dispatch = useDispatch();
  //图片
  const showCoverImg = (info) => {
    if (info.playlist) {
      return <img src={info.playlist.coverImgUrl} alt="" />;
    } else {
      return <></>;
    }
  };
  //文字

  const showName = (info) => {
    if (info.playlist) {
      return <div className="cover-title-text">{info.playlist.name}</div>;
    } else {
      return <></>;
    }
  };

  //歌曲详情
  // const [list, setList] = useState({ songsList: [] });
  const showClick = (item) => {
    dispatch(getSongUrlAction(item.id));
    dispatch(getSongDetailsAction(item));
    dispatch(changeIsplayAction(true));
    dispatch(getSongDetailListAction(item));
    dispatch(getSongLyricAction(item.id));

    // setList({ songsList: [item, ...list.songsList] });
  };
  // console.log(list.songsList);
  const showSongs = (info) => {
    if (info.playlist) {
      const songsList = info.playlist.tracks.slice(0, 11);

      return songsList.map((item, index) => (
        <div key={item.id} className="songItem">
          <span style={{ color: index < 3 ? "#c10d0c" : "" }}>{index + 1}</span>
          <div className="songname">{item.name}</div>
          <div className="icon-botton">
            <div onClick={(e) => showClick(item)}></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ));
    } else {
      return <></>;
    }
  };
  return (
    <div className="cover">
      <div className="cover-title">
        <div className="image-cover covertitle">
          {showCoverImg(info)}
          <div className="pos-cover"></div>
        </div>
        <div className="text-icon covertitle">
          {showName(info)}
          <div className="icon-item">
            <div className="icon-player"></div>
            <div className="icon-subscribe"></div>
          </div>
        </div>
      </div>
      <div className="cover-item">{showSongs(info)}</div>
    </div>
  );
});
