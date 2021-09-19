export function lyricFormat(res) {
  if (!res.lrc) {
    return;
  } else {
    const parseExp = /\[(\d{2}):(\d{2})(\.\d{2,3})\]/;
    const lyric = res.lrc.lyric.trim().split("\n");
    let lyricArr = [];
    lyric.forEach((item) => {
      const result = parseExp.exec(item);
      if (!result[1]) return;
      const time =
        result[1] * 60 * 1000 +
        result[2] * 1000 +
        (result[3].length < 3 ? result[3] * 10 : result[3] * 1);
      const content = item.replace(parseExp, "");
      // console.log(time, content);
      let obj = { time, content };
      lyricArr.push(obj);
    });
    return lyricArr;
  }
}
