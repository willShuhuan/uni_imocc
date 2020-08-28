//vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	//数据源
	state:{
		historyList:uni.getStorageSync("_history")||[]
	},
	mutations:{
		SET_HISTORY_LIST(state,history){
			state.historyList = history
		},
		CLEAR_HISTORY(state){
			state.historyList = []
		}
	},
	actions:{
		set_history({commit,state},history){
			let list = state.historyList;
			// console.log('set_history',list);
			// console.log('set_history',history);
			// if(list.indexOf({history})!==-1){
			// 	console.log("已存在，不存储");
			// 	return;
			// }
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