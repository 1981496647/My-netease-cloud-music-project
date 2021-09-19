import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Carousel } from "antd";

import "./index.css";
import { Banner } from "./style";
import { getTopBannerAction } from "../../store/actionCreaters";

export default memo(function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  const { topBanners } = useSelector((state) => ({
    topBanners: state.getIn(["recommend", "topBanners"]),
  }),shallowEqual);
  const bannerRef = useRef();
  const bannerChange = useCallback(
    (from, to) => {
      setCurrentIndex(to);
    },
    [setCurrentIndex]
  );

  const bannerImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";
  return (
    <Banner bgImg={bannerImage}>
      <div className="topbanner">
        <div className="bannercenter">
          <div className="caousel">
            <Carousel
              effect="fade"
              autoplay
              ref={bannerRef}
              beforeChange={bannerChange}
            >
              {topBanners.map((item) => {
                return (
                  <div key={item.targetId} className="image-banner">
                    <img src={item.imageUrl} alt="" />
                  </div>
                );
              })}
            </Carousel>
          </div>
          <div className="downloadbanner"></div>
          <div
            className="bannerbtn-left btn-1"
            onClick={(e) => bannerRef.current.prev()}
          ></div>
          <div
            className="bannerbtn-right btn-1"
            onClick={(e) => bannerRef.current.next()}
          ></div>
        </div>
      </div>
    </Banner>
  );
});
