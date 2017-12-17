import  Vue from 'vue'
import  Vuex from  'vuex'

import {getUploadTokenAPI} from '@/api/api'

const Activity = {
	state: {
		activity: {}
	},
	getters: {},
	mutations: {},
	actions: {}
}

/**
 * 登录验证信息
 * @type {{state: {itemName: string, itemData: null}, getters: {getLoginCertification: ((state))}, mutations: {CREATE_LOGIN_CERTIFICATION: ((state, data?)), REMOVE_LOGIN_CERTIFICATION: ((state))}}}
 */
const loginCertification = {
  state: {
    itemName: 'LotteryCorrect',
    itemData: null
  },
  getters: {
    getLoginCertification(state) {
      if(!state.itemData){
        let result = window.sessionStorage.getItem(state.itemName)
        state.itemData = result !== null ? JSON.parse(result) : null
      }
      return state.itemData;
    }
  },
  mutations: {
    create_login_certification (state, data) {
      if(typeof data !== 'string'){
        data = JSON.stringify(data)
      }
      sessionStorage.setItem(state.itemName, data)
      state.itemData = data;
    },
    remove_login_certification(state){
      sessionStorage.removeItem(state.itemName)
      state.itemData = null;
    }
  }
}

const uploadCertification = {
  state: {
    uptoken: '',
    bucket: '',
    bucketDomain: 'http://ouvjfhafx.bkt.clouddn.com',
    key: '',
  },
  getters: {},
  mutations: {
    update_uptoken (state, data) {
      state.uptoken = data.upToken
      state.bucket = data.bucket
      state.key = data.key
    }
  },
  action: {
    get_token (context) {
      return new Promise((resolve, reject) => {
        getUploadTokenAPI().then((res) => {
          console.log('响应：', res)
          if (res.code !== 0) {
            console.log(`获取token失败：${res.msg}`)
            return
          }
          context.commit('update_uptoken', res.data)
          resolve()
        })
      });
    }
  }
}


Vue.use(Vuex);
//创建 store 实例
export default new Vuex.Store({
	modules: {
    loginCertification,
    uploadCertification,
		Activity
	}
})
