import React from "react";
import { Redirect } from "react-router";
const Discover = React.lazy(() => import("@/pages/discover"));
const Friend = React.lazy(() => import("@/pages/friend"));
const Mine = React.lazy(() => import("@/pages/mine"));
const Download = React.lazy(() => import("@/pages/download"));
const Recommend = React.lazy(() =>
  import("../pages/discover/c-pages/recommend")
);
const Album = React.lazy(() => import("../pages/discover/c-pages/album"));
const Artist = React.lazy(() => import("../pages/discover/c-pages/artist"));
const Ranking = React.lazy(() => import("../pages/discover/c-pages/ranking"));
const Songs = React.lazy(() => import("../pages/discover/c-pages/songs"));
const Djradio = React.lazy(() => import("../pages/discover/c-pages/djradio"));
const SongDetailPlayer = React.lazy(() =>
  import("../components/player/song-details-interface/index")
);
const SongDetail = React.lazy(() =>
  import("../pages/discover/c-pages/songs/songdetail")
);

// import Discover from "@/pages/discover";
// import Friend from "@/pages/friend";
// import Mine from "@/pages/mine";
// import Download from "@/pages/download";
// import Recommend from "../pages/discover/c-pages/recommend";
// import Album from "../pages/discover/c-pages/album";
// import Artist from "../pages/discover/c-pages/artist";
// import Ranking from "../pages/discover/c-pages/ranking";
// import Songs from "../pages/discover/c-pages/songs";
// import Djradio from "../pages/discover/c-pages/djradio";
// import SongDetailPlayer from "../components/player/song-details-interface/index";
const routes = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to="/discover" />,
  },
  {
    path: "/discover",
    component: Discover,
    routes: [
      {
        path: "/discover",
        exact: true,
        render: () => <Redirect to="/discover/recommend" />,
      },
      {
        path: "/discover/recommend",
        component: Recommend,
      },
      {
        path: "/discover/album",
        component: Album,
      },
      {
        path: "/discover/artist",
        component: Artist,
      },
      {
        path: "/discover/ranking",
        component: Ranking,
      },
      {
        path: "/discover/songs",
        component: Songs,
      },
      {
        path: "/discover/djradio",
        component: Djradio,
      },
      {
        path: "/discover/player",
        component: SongDetailPlayer,
      },
      {
        path: "/discover/songdetail",
        component: SongDetail,
      },
    ],
  },
  {
    path: "/friend",
    component: Friend,
  },
  {
    path: "/mine",
    component: Mine,
  },
  {
    path: "/download",
    component: Download,
  },
];

export default routes;
