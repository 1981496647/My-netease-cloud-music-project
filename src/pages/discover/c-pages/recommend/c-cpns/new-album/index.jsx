import React, { memo, useEffect, useRef } from "react";
import { Carousel } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getNewAlbumAction } from "../../store/actionCreaters";

import ThemeHeard from "@/components/theme-header-cpn/index";

import "./index.css";
export default memo(function NewAlbum() {
  const { newAlbum } = useSelector(
    (state) => ({
      newAlbum: state.getIn(["recommend", "newAlbum"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAlbumAction(10));
  }, [dispatch]);


  const albumRef = useRef()
  return (
    <div>
      <ThemeHeard title={"新碟上架"} />
      <div className="roller">
        <div className="btn-left-newalbum btn-newalbum" onClick={e => albumRef.current.prev()}></div>
        <Carousel className="carousel-newalbum" ref={albumRef}>
          {[0, 1].map((item) => {
            return (
              <div key={item}>
                <div className="newalbum-first-item">
                  {newAlbum.slice(item * 5, (item + 1) * 5).map((ite) => {
                    return (
                      <div key={ite.id} className="newalbum-item">
                        <img src={ite.blurPicUrl} alt="" />
                        <div>{ite.name}</div>
                        <div>{ite.artist.name}</div>
                        <div className="newalbum-pos">
                          <div className="icon-player-newalbum"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Carousel>
        <div className="btn-right-newalbum btn-newalbum" onClick={e => albumRef.current.next()}></div>
      </div>
    </div>
  );
});
