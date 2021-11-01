/**
 * 通用请求接口，包括上传，获取验证码等
 */

import { axiosOptions, axiosRequest, commonContentType } from '@api/service'

const baseUrl = "/common/"

/**
 * 获取验证码
 * @returns {Promise<unknown>}
 */
export function getCodeImg() {
  let option = axiosOptions('get');
  return axiosRequest(baseUrl+'/verifyCode?'+new Date().getTime(),null,option);
}

/**
 * 根据文件路径下载文件
 * @param path
 */
export function downloadByPath(path){
  return axiosRequest(baseUrl+'downloadByPath',{'path':path},axiosOptions(null,null,'blob'))
}
