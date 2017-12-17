import axios from 'axios'

let base = 'http://localhost:9090'
let base2 = 'http://192.168.199.223:8080' // 配置了代理

// 登录接口
export const loginAPI = params => { return axios.post(`${base}/login`, params).then(res => res.data) }

// 获取活动列表数据(/activity/list)
export const getActiveListAPI = params => { return axios.get(`${base}/activity_list`, {params:params}).then(res => res.data) }

// 获取活动数据列表(/activityinfo/list)
export const getActiveDataAPI = params => { return axios.get(`${base}/activityinfo_list`, {params:params}).then(res => res.data) }

// 获取统计数据（/activity/report）
export const getOverViewAPI = params => { return axios.get(`${base}/activity_report`, {params:params}).then(res => res.data) }

// 获取用户列表数据（/user/lucky/list）
export const getUserListAPI = params => { return axios.get(`${base}/user_lucky_list`, {params:params}).then(res => res.data) }

// 获取玩家列表数据(/user/play/list)
export const getPlayerListAPI = params => { return axios.get(`${base}/user_play_list`, {params:params}).then(res => res.data) }

// 发布活动（/activity/publish）
export const publishActiveAPI = params => { return axios.post(`${base}/activity/publish`, {params:params}).then(res => res.data) }

// 结束活动（/activity/close）
export const endActiveAPI = params => { return axios.post(`${base}/activity/close`, params).then(res => res.data) }

// 获取文件上传token
export const getUploadTokenAPI = params => { return axios.get(`/upload/token`).then(res => res.data)}

// 修改活动信息
export const updateActiveAPI = params => { return axios.post(`${base}/activity/update`, params).then(res => res.data)}

// 获取单个活动详细信息
export const getActivityAPI = params => { return axios.get(`${base}/activity`, params).then(res => res.data)}


