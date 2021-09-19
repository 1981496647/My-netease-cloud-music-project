import request from "./request";

// 二维码登录接口
//  生成二维码key
export function getQRkey() {
  return request({
    url: "/login/qr/key",
  });
}

//通过key生成二维码图片 和base64信息

export function getQRcreate(key) {
  return request({
    url: "/login/qr/create",
    params: {
      key,
    },
  });
}

//检测二维码扫码状态 返回 800 801 802  802为扫码成功  返回cookie

export function getQRcheck(key) {
  return request({
    url: "/login/qr/check",
    params: {
      key,
    },
  });
}

//刷新登录
export function getRefesh() {
  return request({
    url: "/login/refresh",
  });
}
