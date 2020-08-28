 import $http from "../http.js"
 //获取首页栏目数据
 export const get_label = (data) =>{
	return $http({
		url:'get_label',
		data
	})
}
//获取列表数据
 export const get_list = (data) =>{
	return $http({
		url:'get_list',
		data
	})
}
//点赞文章
 export const update_likes = (data) =>{
	return $http({
		url:'update_likes',
		data
	})
} 
// 搜索数据
 export const get_search = (data) =>{
	return $http({
		url:'get_search',
		data
	})
}