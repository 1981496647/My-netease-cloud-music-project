import request from "./request";
export function getPlaylist(limit) {
  return request({
    url: "/top/playlist",
    params: {
      limit,
    },
  });
}

export function getPlaylistdetail(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}
