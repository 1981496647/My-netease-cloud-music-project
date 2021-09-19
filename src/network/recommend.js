import request from "./request";
export function getTopbanner() {
  return request({
    url: "/banner",
  });
}

export function getHotRecommend(limit) {
  return request({
    url: "/personalized",
    params: {
      limit,
    },
  });
}

export function getNewAlbum(limit) {
  return request({
    url: "/top/album",
    params: {
      limit,
    },
  });
}
//获取所有榜单
export function getRanking() {
  return request({
    url: "/toplist/detail",
  });
}
//获取榜单详情
export function getRankings(id) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}

//获取歌曲的url
export function getSongUrl(id) {
  return request({
    url: "/song/url",
    params: {
      id,
    },
  });
}

export function getSongLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}

//获取歌曲评论

export function getMusicComment(id, offset) {
  return request({
    url: "/comment/music",
    params: {
      id,
      offset,
    },
  });
}
