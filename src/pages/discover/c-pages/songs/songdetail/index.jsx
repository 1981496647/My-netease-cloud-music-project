import React, { memo } from "react";
import { useDispatch } from "react-redux";
import "./index.css";
import RankingSongListCover from "../../ranking/c-pages/songlistcover";
import { useSelector } from "react-redux";
import Rankingthemeheader from "../../ranking/c-pages/rankingthemeheader";
import RankingSongList from "../../ranking/c-pages/songlist";
export default memo(function SongDetail() {
  const { playtoplistDetail } = useSelector((state) => ({
    playtoplistDetail: state.getIn(["songs", "playtoplistDetail"]),
  }));
  const dispatch = useDispatch();
  if (!playtoplistDetail) return <>加载中</>;

  const showPlaylistdetail = (playtoplistDetail) => {
    if (!playtoplistDetail.tracks) {
      return <>加载中</>;
    } else {
      return (
        <div>
          {playtoplistDetail.tracks.map((item, index) => {
            return (
              <RankingSongList
                info={item}
                index={index}
                dispatch={dispatch}
                key={item.id}
              />
            );
          })}
        </div>
      );
    }
  };
  return (
    <div className="songdetails">
      <div className="songdetailscenter">
        <div className="left">
          <RankingSongListCover info={playtoplistDetail} />
          <Rankingthemeheader info={playtoplistDetail} />
          <div className="titlerankingitem">
            {[
              { name: "wpa", title: "" },
              { name: "wp", title: "标题" },
              { name: "wp-t", title: "时长" },
              { name: "wp-s", title: "歌手" },
            ].map((item) => {
              return (
                <div className={item.name} key={item.name}>
                  {item.title}
                </div>
              );
            })}
          </div>
          {showPlaylistdetail(playtoplistDetail)}
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
});
