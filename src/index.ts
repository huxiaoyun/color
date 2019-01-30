import * as d3ColorUtil from 'd3-color';

export const d3Color = d3ColorUtil;

// 常见颜色映射 ，可使用 d3Color.rgb("red")

/**
 * 判断是否 十六进制颜色值.
 * 输入形式可为 #fff000 #f00
 *
 * @param   String  color   十六进制颜色值
 * @return  Boolean
 */
export const isHexColor = function(color: string) {
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  return reg.test(color);
};
/**
 * RGB 颜色值转换为 十六进制颜色值.
 * r, g, 和 b 需要在 [0, 255] 范围内
 *
 * @param   Number  r       红色色值
 * @param   Number  g       绿色色值
 * @param   Number  b       蓝色色值
 * @return  String          类似#ff00ff
 */
export const rgbToHex = function(r: number, g: number, b: number) {
  // tslint:disable-next-line:no-bitwise
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
};
/**
 * 十六进制颜色值转换为RGB.
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   String  hex       十六进制颜色
 * @return  Array           RGB色值数值
 */
export const hexToRgb = function(hex: string) {
  const rgb = [];
  const hex3Reg = /^#([0-9a-fA-f]{3})$/;
  const hex6Reg = /^#([0-9a-fA-f]{6})$/;
  if (hex3Reg.test(hex)) {
    for (let i = 1; i < 4; i += 1) {
      rgb.push(parseInt('0x' + hex.slice(i, i + 1) + hex.slice(i, i + 1), 16));
    }
  } else if (hex6Reg.test(hex)) {
    for (let i = 1; i < 7; i += 2) {
      rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16));
    }
  }

  return rgb;
};

/**
 * 十六进制颜色值计算渐变色.
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   String  startColor       十六进制颜色
 * @param   endColor  startColor       十六进制颜色
 * @param   Number  step       步数
 * @return  Array           RGB色值数值
 */
export const gradient = function(startColor: string, endColor: string, step: number) {
  if (!isHexColor(startColor) || !isHexColor(endColor)) {
    // tslint:disable-next-line:no-console
    console.error('please input hex color, like #ff000 or #f00');
    return;
  }
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);

  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;

  const gradientColorArr = [];
  for (let i = 0 ; i < (step + 1); i++) {
      gradientColorArr.push(
        rgbToHex(
          Math.floor(rStep * i + sColor[0]),
          Math.floor(gStep * i + sColor[1]),
          Math.floor(bStep * i + sColor[2]),
        ),
      );
  }
  return gradientColorArr;
};


/**
 * 单色十六进制颜色值计算渐变色，使用透明度计算渐变.
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param   String  color       十六进制颜色
 * @param   Number  step       步数
 * @param   Number  startOpacity     开始透明度
 * @param   Number  endOpacity       结束透明度
 * @return  Array           RGB色值数值
 */
export const gradient1 = function(color: string, step: number, startOpacity: number = 0, endOpacity: number = 1) {
  if (!isHexColor(color)) {
    // tslint:disable-next-line:no-console
    console.error('please input hex color, like #ff000 or #f00');
    return;
  }
  const hexColor = hexToRgb(color);

  const gradientColorArr = [];
  for (let i = 0 ; i < (step + 1); i++) {
    const opacity = (i * (endOpacity - startOpacity) / step + startOpacity).toFixed(4);
    gradientColorArr.push(
      `rgba(${hexColor[0]}, ${hexColor[1]}, ${hexColor[2]}, ${opacity})`,
    );
  }
  return gradientColorArr;
};
