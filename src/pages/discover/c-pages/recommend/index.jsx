import React, { memo } from "react";
import TopBanner from "./c-cpns/topBanner/index";
import HotRecommend from "./c-cpns/hotRecommend";
import { LYrecommend } from "./style";
export default memo(function Recommend() {
  return (
    <LYrecommend>
      <TopBanner />
      <HotRecommend />
    </LYrecommend>
  );
});
