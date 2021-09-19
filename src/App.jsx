import React, { memo, Suspense } from "react";
import { Provider } from "react-redux";
import {  HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import routes from "./router";
import AppFooter from "./components/app-footer/index";
import AppHeader from "./components/app-header/index";
import store from "./store";
import MusicPlayerComponent from "./components/player/index";

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        <Suspense fallback={<div>加载中</div>}>{renderRoutes(routes)}</Suspense>
        <AppFooter />
        <MusicPlayerComponent />
      </HashRouter>
    </Provider>
  );
});
