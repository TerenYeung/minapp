import config from '../config/config';

module.exports = {
  /**
   * @description 根据 type 值组装位置字符串
   * 百度和高德都是经度在前纬度在后，然而腾讯就要反着来
   * @param  {Int} type      0 代表正常顺序, 1 代表反序
   * @param  {Float} longitude  经度
   * @param  {Float} latitude  纬度
   * @return {String}           拼凑好的位置字符串
   */
  assembleLocation(type, longitude, latitude) {
    if (type == 0) return longitude + ',' + latitude
    return latitude + ',' + longitude
  }
}
