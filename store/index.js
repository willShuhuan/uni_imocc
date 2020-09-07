//vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		userinfo:uni.getStorageSync('USERINFO')||{},
		historyList:uni.getStorageSync("_history")||[]
	},
	mutations:{
		SET_USER_INFO(state,userinfo){
			state.userinfo = userinfo
		},
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state){
			state.historyList = []
		}
	},
	actions:{
		set_user_info({commit},userinfo){
			uni.setStorageSync("USERINFO",userinfo)
			commit('SET_USER_INFO',userinfo)
		},
		set_history({commit,state},history){
			let list = state.historyList;
			if(isHistoryExists(state,history)){
				console.log("已存在，不存储");
				return;
			}
			
			uni.setStorageSync('_history',list)
			list.unshift(history);
			commit('SET_HISTORY_LIST',list);
		},
		clearHistory({commit}){
			uni.removeStorageSync('_history')
			commit('CLEAR_HISTORY')
		}
	}
})

const isHistoryExists = (state,history)=>{
	let list = state.historyList;
	let exist = false;
	list.map((item,index)=>{
		if(item.name == history.name){
			exist = true;
		}
	})
	return exist;
}

export default store
