export function changeCount(val) {
  if (val < 100000) {
    return val;
  } else if (val > 100000 && val < 100000000) {
    return (val / 10000).toFixed(1) + "万";
  } else {
    return (val / 100000000).toFixed(1) + "亿";
  }
}

export function time(millisecond) {
  //获取分
  const minutes = parseInt(millisecond / 1000 / 60);
  const miao =
    parseInt(millisecond / 1000 - minutes * 60) < 10
      ? "0" + parseInt(millisecond / 1000 - minutes * 60)
      : parseInt(millisecond / 1000 - minutes * 60);
  return millisecond === undefined ? "0:00" : minutes + ":" + miao;
}

export function timeSong(val) {
  const parseNum = parseInt(val);
  const mintues = parseInt(parseNum / 60) > 0 ? parseInt(parseNum / 60) : 0;
  const miao =
    parseNum % 60 >= 10
      ? parseInt(parseNum % 60)
      : "0" + parseInt(parseNum % 60);
  return mintues + ":" + miao;
}

export function timeComment(val) {
  const timeDate = new Date(val);
  const m = timeDate.getMonth() + 1;
  const d = timeDate.getDate();
  const h = timeDate.getHours();
  const min = timeDate.getMinutes();
  return m + "月" + d + "日" + h + ":" + min;
}
