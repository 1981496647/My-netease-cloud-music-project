import request from "./request";

export function toplist() {
  return request({
    url: "/toplist/detail",
  });
}
